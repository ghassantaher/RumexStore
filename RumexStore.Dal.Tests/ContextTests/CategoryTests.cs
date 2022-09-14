﻿using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RumexStore.Dal.EfStructures;
using RumexStore.Dal.Initialization;
using RumexStore.Dal.Tests.Helpers;
using RumexStore.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RumexStore.Dal.Tests.ContextTests
{
    [Collection("RumexStore.Dal")]
    public class CategoryTests : IClassFixture<CategoryDatabaseFixture>
    {
        CategoryDatabaseFixture fixture;

        public CategoryTests(CategoryDatabaseFixture fixture)
        {
            this.fixture = fixture;
            using var context = new StoreDbContext(this.fixture._options);
            this.fixture.CleanDatabase(context);
        }

        // ... write tests, using fixture.Db to get access to the SQL Server ...
        [Fact]
        public void FirstTest()
        {
            Assert.True(true);
        }
        [Fact]
        public void ShouldAddACategoryWithDbSet()
        {
            using var context = new StoreDbContext(this.fixture._options);

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
            using var context = new StoreDbContext(this.fixture._options);
            var category = new Category { CategoryName = "Foo" };
            context.Add(category);
            Assert.Equal(EntityState.Added, context.Entry(category).State);
            Assert.True(category.Id <= 0);
            Assert.Null(category.TimeStamp);
            context.SaveChanges();
            Assert.Equal(EntityState.Unchanged, context.Entry(category).State);
            Assert.NotNull(category.TimeStamp);
            Assert.Equal(1, context.Categories.Count());
        }
        [Fact]
        public void ShouldGetAllCategoriesOrderedByName()
        {
            using var context = new StoreDbContext(this.fixture._options);
            context.Categories.Add(new Category { CategoryName = "Foo" });
            context.Categories.Add(new Category { CategoryName = "Bar" });
            context.SaveChanges();
            var categories = context.Categories.OrderBy(c => c.CategoryName).ToList();
            Assert.Equal(2, context.Categories.Count());
            Assert.Equal("Bar", categories[0].CategoryName);
            Assert.Equal("Foo", categories[1].CategoryName);
        }

        [Fact]
        public void ShouldUpdateACategory()
        {
            using var context = new StoreDbContext(this.fixture._options);
            var category = new Category { CategoryName = "Foo" };
            context.Categories.Add(category);
            context.SaveChanges();
            category.CategoryName = "Bar";
            context.Categories.Update(category);
            Assert.Equal(EntityState.Modified, context.Entry(category).State);
            context.SaveChanges();
            Assert.Equal(EntityState.Unchanged, context.Entry(category).State);
            using var context2 = new StoreDbContext(this.fixture._options);
            Assert.Equal("Bar", context2.Categories.First().CategoryName);
        }
        [Fact]
        public void ShouldNotUpdateANonAttachedCategory()
        {
            using var context = new StoreDbContext(this.fixture._options);
            var category = new Category { CategoryName = "Foo" };
            context.Categories.Add(category);
            category.CategoryName = "Bar";
            Assert.Throws<InvalidOperationException>(() => context.Categories.Update(category));
        }

        [Fact]
        public void ShouldDeleteACategory()
        {
            using var context = new StoreDbContext(this.fixture._options);
            var category = new Category { CategoryName = "Foo" };
            context.Categories.Add(category);
            context.SaveChanges();
            Assert.Equal(1, context.Categories.Count());
            context.Categories.Remove(category);
            Assert.Equal(EntityState.Deleted, context.Entry(category).State);
            context.SaveChanges();
            Assert.Equal(EntityState.Detached, context.Entry(category).State);
            Assert.Equal(0, context.Categories.Count());
        }
        [Fact]
        public void ShouldDeleteACategoryWithTimestampData()
        {
            using var context = new StoreDbContext(this.fixture._options);
            var category = new Category { CategoryName = "Foo" };
            context.Categories.Add(category);
            context.SaveChanges();
            using var context2 = new StoreDbContext(this.fixture._options);
            var catToDelete = new Category { Id = category.Id, TimeStamp = category.TimeStamp };
            context2.Entry(catToDelete).State = EntityState.Deleted;
            var affected = context2.SaveChanges();
            Assert.Equal(1, affected);
        }
        [Fact]
        public void ShouldNotDeleteACategoryWithoutTimestampData()
        {
            using var context = new StoreDbContext(this.fixture._options);
            var category = new Category { CategoryName = "Foo" };
            context.Categories.Add(category);
            context.SaveChanges();
            using var context2 = new StoreDbContext(this.fixture._options);
            var catToDelete = new Category { Id = category.Id };
            context2.Categories.Remove(catToDelete);
            var ex = Assert.Throws<DbUpdateConcurrencyException>(() => context2.SaveChanges());
            Assert.Equal(1, ex.Entries.Count);
            Assert.Equal(category.Id, ((Category)ex.Entries[0].Entity).Id);
        }
    }
    public class CategoryDatabaseFixture : IDisposable
    {
        public CategoryDatabaseFixture()
        {
            //Db = new SqlConnection("MyConnectionString");
            _options = this.CreateUniqueClassOptions<StoreDbContext>();

            using var context = new StoreDbContext(_options);
            context.Database.EnsureCreated();
            //            context.Database.EnsureDeleted();

            // ... initialize data in the test database ...
        }

        public void Dispose()
        {
            //    // ... clean up test data from the database ...
            using var context = new StoreDbContext(_options);
            context.Database.EnsureDeleted();
            //CleanDatabase(context);
            context.Dispose();
        }

        //public SqlConnection Db { get; private set; }
        public DbContextOptions<StoreDbContext> _options { get; private set; }
        public void CleanDatabase(StoreDbContext context)
        {
            //            SampleDataInitializer.ClearData(_db);
            SampleDataInitializer.ClearData(context);
        }
    }
}
