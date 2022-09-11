using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RumexStore.Dal.EfStructures;
using RumexStore.Dal.Initialization;
using RumexStore.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RumexStore.Dal.Tests.ContextTests
{
    [Collection("RumexStore.Dal")]
    public class CategoryTests : IDisposable
    {
        //        private readonly StoreDbContext _db;
        private IConfigurationRoot _configuration;

        public CategoryTests()
        {
            _configuration = new ConfigurationBuilder()
               .AddUserSecrets<CategoryTests>()
               .Build();

            var connectionString = _configuration["ConnectionStrings:RumexStoreConnection"];
            //const string connectionString = "Server=(localdb)\\MSSQLLocalDB;Database=RumexStore;MultipleActiveResultSets=true";
            var builder = new DbContextOptionsBuilder<StoreDbContext>();
            builder.UseSqlServer(connectionString);
            var options = builder.Options;
            using (var context = new StoreDbContext(options))
            {
                CleanDatabase(context);
            }
        }

        //_ghtpublic CategoryTests()
        //{
        //    _db = new StoreContextFactory().CreateDbContext(new string[0]);
        //    CleanDatabase();
        //}

        public void Dispose()

        {
            var connectionString = _configuration["ConnectionStrings:RumexStoreConnection"];
            var builder = new DbContextOptionsBuilder<StoreDbContext>();
            builder.UseSqlServer(connectionString);
            var options = builder.Options;
            using (var context = new StoreDbContext(options))
            {
                CleanDatabase(context);
                context.Dispose();
            }
        }
        private void CleanDatabase(StoreDbContext context)
        {
//            SampleDataInitializer.ClearData(_db);
            SampleDataInitializer.ClearData(context);
        }

        [Fact]
        public void FirstTest()
        {
            Assert.True(true);
        }

        [Fact]
        public void ShouldAddACategoryWithDbSet()
        {
            var connectionString = _configuration["ConnectionStrings:RumexStoreConnection"];
            var builder = new DbContextOptionsBuilder<StoreDbContext>();
            builder.UseSqlServer(connectionString);
            var options = builder.Options;
            using var context = new StoreDbContext(options) ;
            var category = new Category { CategoryName = "Foo" };
            context.Categories.Add(category);
            Assert.Equal(EntityState.Added, context.Entry(category).State);
            Assert.True(category.Id <= 0);
            Assert.Null(category.TimeStamp);
            context.SaveChanges();
            Assert.Equal(EntityState.Unchanged, context.Entry(category).State);
            Assert.NotNull(category.TimeStamp);
            Assert.Equal(1, context.Categories.Count());
        }
        [Fact]
        public void ShouldAddACategoryWithContext()
        {
            var connectionString = _configuration["ConnectionStrings:RumexStoreConnection"];
            var builder = new DbContextOptionsBuilder<StoreDbContext>();
            builder.UseSqlServer(connectionString);
            var options = builder.Options;
            using (var _db = new StoreDbContext(options))
            {
                var category = new Category { CategoryName = "Foo" };
                _db.Add(category);
                Assert.Equal(EntityState.Added, _db.Entry(category).State);
                Assert.True(category.Id <= 0);
                Assert.Null(category.TimeStamp);
                _db.SaveChanges();
                Assert.Equal(EntityState.Unchanged, _db.Entry(category).State);
                Assert.NotNull(category.TimeStamp);
                Assert.Equal(1, _db.Categories.Count());
            }


        }
        [Fact]
        public void ShouldGetAllCategoriesOrderedByName()
        {
            var connectionString = _configuration["ConnectionStrings:RumexStoreConnection"];
            var builder = new DbContextOptionsBuilder<StoreDbContext>();
            builder.UseSqlServer(connectionString);
            var options = builder.Options;
            using (var _db = new StoreDbContext(options))
            {
                _db.Categories.Add(new Category { CategoryName = "Foo" });
                _db.Categories.Add(new Category { CategoryName = "Bar" });
                _db.SaveChanges();
                var categories = _db.Categories.OrderBy(c => c.CategoryName).ToList();
                Assert.Equal(2, _db.Categories.Count());
                Assert.Equal("Bar", categories[0].CategoryName);
                Assert.Equal("Foo", categories[1].CategoryName);
            }


        }

        [Fact]
        public void ShouldUpdateACategory()
        {
            var connectionString = _configuration["ConnectionStrings:RumexStoreConnection"];
            var builder = new DbContextOptionsBuilder<StoreDbContext>();
            builder.UseSqlServer(connectionString);
            var options = builder.Options;
            using (var _db = new StoreDbContext(options))
            {
                var category = new Category { CategoryName = "Foo" };
                _db.Categories.Add(category);
                _db.SaveChanges();
                category.CategoryName = "Bar";
                _db.Categories.Update(category);
                Assert.Equal(EntityState.Modified, _db.Entry(category).State);
                _db.SaveChanges();
                Assert.Equal(EntityState.Unchanged, _db.Entry(category).State);
//                StoreDbContext context;
                using var context = new StoreDbContext(options);
                Assert.Equal("Bar", context.Categories.First().CategoryName);
                //using (context = new StoreContextFactory().CreateDbContext(null))
                //{
                //    Assert.Equal("Bar", context.Categories.First().CategoryName);
                //}
            }
        }

        [Fact]
        public void ShouldNotUpdateANonAttachedCategory()
        {
            var connectionString = _configuration["ConnectionStrings:RumexStoreConnection"];
            var builder = new DbContextOptionsBuilder<StoreDbContext>();
            builder.UseSqlServer(connectionString);
            var options = builder.Options;
            using (var _db = new StoreDbContext(options))
            {
                var category = new Category { CategoryName = "Foo" };
                _db.Categories.Add(category);
                category.CategoryName = "Bar";
                Assert.Throws<InvalidOperationException>(() => _db.Categories.Update(category));
            }

        }

        [Fact]
        public void ShouldDeleteACategory()
        {
            var connectionString = _configuration["ConnectionStrings:RumexStoreConnection"];
            var builder = new DbContextOptionsBuilder<StoreDbContext>();
            builder.UseSqlServer(connectionString);
            var options = builder.Options;
            using (var _db = new StoreDbContext(options))
            {
                var category = new Category { CategoryName = "Foo" };
                _db.Categories.Add(category);
                _db.SaveChanges();
                Assert.Equal(1, _db.Categories.Count());
                _db.Categories.Remove(category);
                Assert.Equal(EntityState.Deleted, _db.Entry(category).State);
                _db.SaveChanges();
                Assert.Equal(EntityState.Detached, _db.Entry(category).State);
                Assert.Equal(0, _db.Categories.Count());
            }

        }
        [Fact]
        public void ShouldDeleteACategoryWithTimestampData()
        {
            var connectionString = _configuration["ConnectionStrings:RumexStoreConnection"];
            var builder = new DbContextOptionsBuilder<StoreDbContext>();
            builder.UseSqlServer(connectionString);
            var options = builder.Options;
            using var _db = new StoreDbContext(options);
            var category = new Category { CategoryName = "Foo" };
            _db.Categories.Add(category);
            _db.SaveChanges();
            using var context = new StoreDbContext(options);
            var catToDelete = new Category { Id = category.Id, TimeStamp = category.TimeStamp };
            context.Entry(catToDelete).State = EntityState.Deleted;
            var affected = context.SaveChanges();
            Assert.Equal(1, affected);
        }
        [Fact]
        public void ShouldNotDeleteACategoryWithoutTimestampData()
        {
            var connectionString = _configuration["ConnectionStrings:RumexStoreConnection"];
            var builder = new DbContextOptionsBuilder<StoreDbContext>();
            builder.UseSqlServer(connectionString);
            var options = builder.Options;
            using var _db = new StoreDbContext(options);
            var category = new Category { CategoryName = "Foo" };
            _db.Categories.Add(category);
            _db.SaveChanges();
            using var context = new StoreDbContext(options);
            var catToDelete = new Category { Id = category.Id };
            context.Categories.Remove(catToDelete);
            var ex = Assert.Throws<DbUpdateConcurrencyException>(() => context.SaveChanges());
            Assert.Equal(1, ex.Entries.Count);
            Assert.Equal(category.Id, ((Category)ex.Entries[0].Entity).Id);
        }

    }
}
