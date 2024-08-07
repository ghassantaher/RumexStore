﻿using Microsoft.EntityFrameworkCore;
using RumexStore.Dal.EfStructures;
using RumexStore.Models.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace RumexStore.Dal.Repos.Base
{
    public interface IRepo<T> : IDisposable where T : EntityBase
    {
        DbSet<T> Table { get; }
        StoreDbContext Context { get; }
        (string? Schema, string? TableName) TableSchemaAndName { get; }
        bool HasChanges { get; }
        T? Find(int? id);
        T? FindAsNoTracking(int id);
        T? FindIgnoreQueryFilters(int id);
        IEnumerable<T> GetAll();
        IEnumerable<T> GetAll(Expression<Func<T, object>> orderBy);
        IEnumerable<T> GetRange(IQueryable<T> query, int skip, int take);
        int Add(T entity, bool persist = true);
        int AddRange(IEnumerable<T> entities, bool persist = true);
        int Update(T entity, bool persist = true);
        int UpdateRange(IEnumerable<T> entities, bool persist = true);
        int Delete(T entity, bool persist = true);
        int DeleteRange(IEnumerable<T> entities, bool persist = true);
        int SaveChanges();
        Task<bool> CanConnectAsync();
    }
}
