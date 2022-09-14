using Microsoft.EntityFrameworkCore;
using RumexStore.Dal.EfStructures;
using RumexStore.Dal.Initialization;
using RumexStore.Dal.Tests.Helpers;
using RumexStore.Models.Entities;
using RumexStore.Models.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RumexStore.Dal.Tests.ContextTests
{
    [Collection("RumexStore.Dal")]
    public class ProductTests : IClassFixture<ProductDatabaseFixture>
    {
        ProductDatabaseFixture fixture;

        public ProductTests(ProductDatabaseFixture fixture)
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
        public void ShouldAddAProduct()
        {
            using var context = new StoreDbContext(this.fixture._options);

            var category = context.CreateACategory("Foo");
            var product = new Product
            {
                Details = { ProductImage = "product-image.png",
                    ProductImageLarge = "product-image-lg.png",
                    ProductImageThumb = "product-thumb.png",
                    ModelName = "Communications Device",
                    Description =
                  "Subversively stay in touch with this miniaturized wireless communications device. Speak into the pointy end and listen with the other end! Voice-activated dialing makes calling for backup a breeze. Excellent for undercover work at schools, rest homes, and most corporate headquarters. Comes in assorted colors.",
                    ModelNumber = "RED1"},
                UnitCost = 49.99M,
                CurrentPrice = 49.99M,
                UnitsInStock = 2,
                IsFeatured = true,
                CategoryId = category.Id
            };
            context.Products.Add(product);
            Assert.Equal(EntityState.Added, context.Entry(product).State);
            Assert.True(product.Id <= 0);
            Assert.Null(product.TimeStamp);
            context.SaveChanges();
            Assert.Equal(EntityState.Unchanged, context.Entry(product).State);
            Assert.NotNull(product.TimeStamp);
            Assert.Equal(1, context.Products.Count());
        }


         [Fact]
        public void ShouldGetAllProductsOrderedByModelName()
        {
            using var context = new StoreDbContext(this.fixture._options);
            var category1 = context.CreateACategory("Foo");
            var category2 = context.CreateACategory("Bar");
            context.Products.Add(new Product
            {
                Details = { ProductImage = "product-image.png",
                    ProductImageLarge = "product-image-lg.png",
                    ProductImageThumb = "product-thumb.png",
                    ModelName = "Prod1",
                    Description =
                  "Prod 1 Description",
                    ModelNumber = "RED1"},
                UnitCost = 49.99M,
                CurrentPrice = 49.99M,
                UnitsInStock = 2,
                IsFeatured = true,
                CategoryId = category1.Id
            });
            context.Products.Add(new Product
            {
                Details = { ProductImage = "product-image.png",
                    ProductImageLarge = "product-image-lg.png",
                    ProductImageThumb = "product-thumb.png",
                    ModelName = "Prod2",
                    Description =
                  "Prod 2 Description",
                    ModelNumber = "RED2"},
                UnitCost = 49.99M,
                CurrentPrice = 49.99M,
                UnitsInStock = 2,
                IsFeatured = true,
                CategoryId = category2.Id
            });
            context.SaveChanges();
            var products = context.Products.OrderBy(c => c.Details.ModelName).ToList();
            Assert.Equal(2, context.Categories.Count());
            Assert.Equal("Prod1", products[0].Details.ModelName);
            Assert.Equal("Prod2", products[1].Details.ModelName);
        }

        [Fact]
        public void ShouldUpdateAProduct()
        {
            using var context = new StoreDbContext(this.fixture._options);
            var category = context.CreateACategory("Foo");
            var product = new Product
            {
                Details = { ProductImage = "product-image.png",
                    ProductImageLarge = "product-image-lg.png",
                    ProductImageThumb = "product-thumb.png",
                    ModelName = "Communications Device",
                    Description =
                  "Subversively stay in touch with this miniaturized wireless communications device. Speak into the pointy end and listen with the other end! Voice-activated dialing makes calling for backup a breeze. Excellent for undercover work at schools, rest homes, and most corporate headquarters. Comes in assorted colors.",
                    ModelNumber = "RED1"},
                UnitCost = 49.99M,
                CurrentPrice = 49.99M,
                UnitsInStock = 2,
                IsFeatured = true,
                CategoryId = category.Id
            };
            context.Products.Add(product);
            context.SaveChanges();



            Assert.Equal("Communications Device", context.Products.First().Details.ModelName);
            product.Details.ModelName = "Prod2";
            context.Products.Update(product);
            Assert.Equal(EntityState.Modified, context.Entry(product).State);
            context.SaveChanges();
            Assert.Equal(EntityState.Unchanged, context.Entry(product).State);
            using var context2 = new StoreDbContext(this.fixture._options);
            Assert.Equal("Prod2", context2.Products.First().Details.ModelName);
        }

        [Fact]
        public void ShouldDeleteACategory()
        {
            using var context = new StoreDbContext(this.fixture._options);
            var category = context.CreateACategory("Foo");
            var product = new Product
            {
                Details = { ProductImage = "product-image.png",
                    ProductImageLarge = "product-image-lg.png",
                    ProductImageThumb = "product-thumb.png",
                    ModelName = "Communications Device",
                    Description =
                  "Subversively stay in touch with this miniaturized wireless communications device. Speak into the pointy end and listen with the other end! Voice-activated dialing makes calling for backup a breeze. Excellent for undercover work at schools, rest homes, and most corporate headquarters. Comes in assorted colors.",
                    ModelNumber = "RED1"},
                UnitCost = 49.99M,
                CurrentPrice = 49.99M,
                UnitsInStock = 2,
                IsFeatured = true,
                CategoryId = category.Id
            };
            context.Products.Add(product);
            context.SaveChanges();
            Assert.Equal(1, context.Products.Count());
            context.Products.Remove(product);
            Assert.Equal(EntityState.Deleted, context.Entry(product).State);
            context.SaveChanges();
            Assert.Equal(EntityState.Detached, context.Entry(product).State);
            Assert.Equal(0, context.Products.Count());
        }
    }
    public class ProductDatabaseFixture : IDisposable
    {
        public ProductDatabaseFixture()
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
