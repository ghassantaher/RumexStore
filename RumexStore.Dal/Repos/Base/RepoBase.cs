using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using RumexStore.Dal.EfStructures;
using RumexStore.Dal.Exceptions;
using RumexStore.Models.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace RumexStore.Dal.Repos.Base
{
    public abstract class RepoBase<T> : IRepo<T> where T : EntityBase, new()
    {
        public DbSet<T> Table { get; }
        public StoreDbContext Context { get; }
        private readonly bool _disposeContext;

        protected RepoBase(StoreDbContext context)
        {
            Context = context;
            Table = Context.Set<T>();
        }
        protected RepoBase(DbContextOptions<StoreDbContext> options) : this(new StoreDbContext(options))
        {
            _disposeContext = true;
        }
        public virtual void Dispose()
        {
            if (_disposeContext)
            {
                Context.Dispose();
            }
        }

        public T? Find(int? id) => Table.Find(id);
        public T? FindAsNoTracking(int id) => Table.Where(x => x.Id == id).AsNoTracking().FirstOrDefault();
        public T? FindIgnoreQueryFilters(int id) => Table.IgnoreQueryFilters().FirstOrDefault(x => x.Id == id);
        public virtual IEnumerable<T> GetAll() => Table;
        public virtual IEnumerable<T> GetAll(Expression<Func<T, object>> orderBy)
            => Table.OrderBy(orderBy);
        public IEnumerable<T> GetRange(IQueryable<T> query, int skip, int take)
            => query.Skip(skip).Take(take);

        public (string? Schema, string? TableName) TableSchemaAndName
        {
            get
            {
                //var entityType = Context.Model.FindEntityType(typeof(T).FullName);
                var entityType = Context.Model.FindEntityType(typeof(T));
                var schema = entityType != null ? entityType.GetSchema() : String.Empty;
                var tableName = entityType != null ? entityType.GetTableName() : String.Empty;
                return (schema, tableName);

                //var metaData = Context.Model
                //    .FindEntityType(typeof(T).FullName)
                //    .SqlServer();
                //return (metaData.Schema, metaData.TableName);
            }
        }
        public bool HasChanges => Context.ChangeTracker.HasChanges();

        public virtual int Add(T entity, bool persist = true)
        {
            Table.Add(entity);
            return persist ? SaveChanges() : 0;
        }
        public virtual int AddRange(IEnumerable<T> entities, bool persist = true)
        {
            Table.AddRange(entities);
            return persist ? SaveChanges() : 0;
        }
        public virtual int Update(T entity, bool persist = true)
        {
            Table.Update(entity);
            return persist ? SaveChanges() : 0;
        }
        public virtual int UpdateRange(IEnumerable<T> entities, bool persist = true)
        {
            Table.UpdateRange(entities);
            return persist ? SaveChanges() : 0;
        }
        public virtual int Delete(T entity, bool persist = true)
        {
            Table.Remove(entity);
            return persist ? SaveChanges() : 0;
        }
        public virtual int DeleteRange(IEnumerable<T> entities, bool persist = true)
        {
            Table.RemoveRange(entities);
            return persist ? SaveChanges() : 0;
        }
        public int SaveChanges()
        {
            try
            {
                return Context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                //A concurrency error occurred
                //Should log and handle intelligently
                throw new RumexStoreConcurrencyException("A concurrency error happened.", ex);
            }
            catch (RetryLimitExceededException ex)
            {
                //DbResiliency retry limit exceeded
                //Should log and handle intelligently
                throw new RumexStoreRetryLimitExceededException("There is a problem with you connection.", ex);
            }
            catch (DbUpdateException ex)
            {
                //Should log and handle intelligently
                if (ex.InnerException is SqlException sqlException)
                {
                    if (sqlException.Message.Contains("FOREIGN KEY constraint", StringComparison.OrdinalIgnoreCase))
                    {
                        if (sqlException.Message.Contains("table \"Store.Products\", column 'Id'",
                            StringComparison.OrdinalIgnoreCase))
                        {
                            throw new RumexStoreInvalidProductException($"Invalid Product Id\r\n{ex.Message}", ex);
                        }
                        //if (sqlException.Message.Contains("table \"Store.Customers\", column 'Id'",
                        //    StringComparison.OrdinalIgnoreCase))
                        //{
                        //    throw new RumexStoreInvalidCustomerException($"Invalid Customer Id\r\n{ex.Message}", ex);
                        //}
                    }
                }
                throw new RumexStoreException("An error occurred updating the database", ex);
            }
            catch (Exception ex)
            {
                //Should log and handle intelligently
                throw new RumexStoreException("An error occurred updating the database", ex);
            }
        }
        public async Task<bool> CanConnectAsync()
            => await Context.Database.CanConnectAsync();

    }
}
