using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using Newtonsoft.Json;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Math;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Text;
using RumexStore.Dal.EfStructures;
using RumexStore.Dal.Repos;
using RumexStore.Dal.Repos.Base;
using RumexStore.Dal.Repos.Interfaces;
using RumexStore.Models.Entities;
using RumexStore.Service.Controllers;
using RumexStore.Service.Tests.Helpers;
using RumexStore.Service.Tests.TestClasses.Base;
using RumexStore.Service.Tests.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Product = RumexStore.Models.Entities.Product;

namespace RumexStore.Service.Tests.TestClasses
{
    [Collection("Database collection")]
    public class ProductControllerTests
    {
        DatabaseFixtureMainDatabaseMultiClasses fixture;
        public ProductControllerTests(DatabaseFixtureMainDatabaseMultiClasses fixture)
        {
            this.fixture = fixture;
            this.fixture.RootAddress = "api/product";
            var options = new DbContextOptionsBuilder<StoreDbContext>().UseInMemoryDatabase(databaseName: "WorldCities").Options;
            using var context = new StoreDbContext(options);
            EntitiesHelper.ClearProducts(context);
            EntitiesHelper.AddProducts(context, 1, 1, 2);
        }

        [Theory]
        [InlineData(1, "cat-1")]
        [InlineData(2, "cat-1")]
        [InlineData(3, "cat-2")]
        [InlineData(4, "cat-3")]
        [InlineData(5, "cat-4")]
        [InlineData(6, "cat-5")]
        [InlineData(7, "cat-6")]
        public void ShouldGetOneProductWithCategoryName(int productId, string categoryName)
        {
            //Arrange
            var options = new DbContextOptionsBuilder<StoreDbContext>().UseInMemoryDatabase(databaseName: "WorldCities").Options;
            using var context = new StoreDbContext(options);
            EntitiesHelper.AddProducts(context, categoryId: 2, productStartId: 3, productEndId: 3);
            EntitiesHelper.AddProducts(context, categoryId: 3, productStartId: 4, productEndId: 4);
            EntitiesHelper.AddProducts(context, categoryId: 4, productStartId: 5, productEndId: 5);
            EntitiesHelper.AddProducts(context, categoryId: 5, productStartId: 6, productEndId: 6);
            EntitiesHelper.AddProducts(context, categoryId: 6, productStartId: 7, productEndId: 7);
            EntitiesHelper.AddProducts(context, categoryId: 7, productStartId: 8, productEndId: 8);
            var repo = new ProductRepo(context);

            var controller = new ProductController(repo);

            // Act
            var product = controller.Get(productId);

            // Assert
            Assert.NotNull(product);


            Assert.NotNull(product.Result);
            var okObjectResult = product.Result as OkObjectResult;
            Assert.NotNull(okObjectResult);
            if(okObjectResult != null)
            {
                Assert.True(okObjectResult.StatusCode == StatusCodes.Status200OK);
                Assert.NotNull(okObjectResult.Value);
                if(okObjectResult.Value != null)
                {
                    Assert.True(((Product)okObjectResult.Value).Id == productId);
                    Assert.True(((Product)okObjectResult.Value).CategoryName == categoryName);
                }
            }
        }

        [Fact(Skip = "test should execute only if services are running")]
        public async void ShouldFailIfBadProdId()
        {
            //Get One Product with Category Name: http://localhost:55882/api/product/1
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync($"{this.fixture.ServiceAddress}{this.fixture.RootAddress}/100");
                Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
            }
        }
        [Fact]
        public void ShouldFailIfBadProductId()
        {
            var prodId = 99;
            var options = new DbContextOptionsBuilder<StoreDbContext>().UseInMemoryDatabase(databaseName: "WorldCities").Options;
            using var context = new StoreDbContext(options);
            EntitiesHelper.AddProducts(context, categoryId: 2, productStartId: 3, productEndId: 3);
            EntitiesHelper.AddProducts(context, categoryId: 3, productStartId: 4, productEndId: 4);
            EntitiesHelper.AddProducts(context, categoryId: 4, productStartId: 5, productEndId: 5);
            EntitiesHelper.AddProducts(context, categoryId: 5, productStartId: 6, productEndId: 6);
            EntitiesHelper.AddProducts(context, categoryId: 6, productStartId: 7, productEndId: 7);
            EntitiesHelper.AddProducts(context, categoryId: 7, productStartId: 8, productEndId: 8);
            var repo = new ProductRepo(context);

            var controller = new ProductController(repo);

            // Act
            var product = controller.Get(prodId);

            // Assert
            Assert.NotNull(product);


            Assert.NotNull(product.Result);
            var notFoundResult = product.Result as NotFoundResult;
            Assert.NotNull(notFoundResult);
            Assert.True(notFoundResult?.StatusCode == StatusCodes.Status404NotFound);
        }
        [Fact]
        public void ShouldGetNoProductIfNonIsFeatured()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<StoreDbContext>().UseInMemoryDatabase(databaseName: "WorldCities").Options;
            using var context = new StoreDbContext(options);
            EntitiesHelper.AddProducts(context, categoryId: 2, productStartId: 3, productEndId: 3);
            EntitiesHelper.AddProducts(context, categoryId: 3, productStartId: 4, productEndId: 4);
            EntitiesHelper.AddProducts(context, categoryId: 4, productStartId: 5, productEndId: 5);
            EntitiesHelper.AddProducts(context, categoryId: 5, productStartId: 6, productEndId: 6);
            EntitiesHelper.AddProducts(context, categoryId: 6, productStartId: 7, productEndId: 7);
            EntitiesHelper.AddProducts(context, categoryId: 7, productStartId: 8, productEndId: 8);
            var repo = new ProductRepo(context);

            var controller = new ProductController(repo);

            // Act
            var products = controller.GetFeatured();

            // Assert
            Assert.NotNull(products);

            Assert.NotNull(products);
            Assert.NotNull(products.Result);
            var okObjectResult = products.Result as OkObjectResult;
            Assert.NotNull(okObjectResult);
            Assert.True(okObjectResult?.StatusCode == StatusCodes.Status200OK);
            Assert.NotNull(okObjectResult?.Value);
            Assert.True((okObjectResult?.Value as List<Product>)?.Count() == 0);
        }
        [Fact]
        public void ShouldGetAllFeaturedProducts()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<StoreDbContext>().UseInMemoryDatabase(databaseName: "WorldCities").Options;
            using var context = new StoreDbContext(options);
            EntitiesHelper.AddProducts(context, categoryId: 2, productStartId: 3, productEndId: 3);
            EntitiesHelper.AddProducts(context, categoryId: 3, productStartId: 4, productEndId: 4);
            EntitiesHelper.AddProducts(context, categoryId: 4, productStartId: 5, productEndId: 5);
            EntitiesHelper.AddProducts(context, categoryId: 5, productStartId: 6, productEndId: 6, isFeatured: true);
            EntitiesHelper.AddProducts(context, categoryId: 6, productStartId: 7, productEndId: 7, isFeatured: true);
            EntitiesHelper.AddProducts(context, categoryId: 7, productStartId: 8, productEndId: 8, isFeatured:true);
            var repo = new ProductRepo(context);

            var controller = new ProductController(repo);

            // Act
            var products = controller.GetFeatured();

            // Assert
            Assert.NotNull(products);

            Assert.NotNull(products);
            Assert.NotNull(products.Result);
            var okObjectResult = products.Result as OkObjectResult;
            Assert.NotNull(okObjectResult);
            Assert.True(okObjectResult?.StatusCode == StatusCodes.Status200OK);
            Assert.NotNull(okObjectResult?.Value);
            Assert.True((okObjectResult?.Value as List<Product>)?.Count() == 3);
            if(okObjectResult != null && okObjectResult.Value != null)
            {
                foreach (var product in (List<Product>)okObjectResult.Value)
                {
                    Assert.True(product.Details != null);
                    Assert.True(product.IsFeatured == true);
                }
            }
        }
        public void GetQuestions_WhenNoParameters_ReturnsAllQuestions()
        {
            var mockQuestions = new
            List<Product>();
            for (int i = 1; i <= 10; i++)
            {
                mockQuestions.Add(new Product
                {
                    Id = 1,
                    Details = new Models.Entities.Base.ProductDetails
                    {
                        ModelName = $"Product title {i}",
                        Description = $"Product description {i}",
                        ModelNumber = $"Product number {i}"
                    },
                    CurrentPrice = i,
                    IsFeatured = Convert.ToBoolean((i % 2)),
                }) ;
            }
            var queryable = mockQuestions.AsQueryable();


            var dbSet = new Mock<DbSet<Product>>();
            dbSet.As<IQueryable<Product>>().Setup(m => m.Provider).Returns(queryable.Provider);
            dbSet.As<IQueryable<Product>>().Setup(m => m.Expression).Returns(queryable.Expression);
            dbSet.As<IQueryable<Product>>().Setup(m => m.ElementType).Returns(queryable.ElementType);
            dbSet.As<IQueryable<Product>>().Setup(m => m.GetEnumerator()).Returns(() => queryable.GetEnumerator());
            dbSet.Setup(d => d.Add(It.IsAny<Product>())).Callback<Product>((s) => mockQuestions.Add(s));

            var mockDataRepository = new Mock<IProductRepo>();
            mockDataRepository.Setup(repo=>repo.Table).Returns(dbSet.Object);

            var mockConfigurationRoot = new Mock<IConfigurationRoot>();
            mockConfigurationRoot.SetupGet(config =>
            config[It.IsAny<string>()]).Returns("some setting");
            var questionsController = new ProductController(mockDataRepository.Object
);
            var result = questionsController.GetFeatured();
            mockDataRepository.Verify(
            mock => mock.GetFeaturedWithCategoryName(),
            Times.Once()
            );
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        [InlineData(4)]
        [InlineData(5)]
        [InlineData(6)]
        [InlineData(7)]
        [InlineData(8)]
        [InlineData(9)]
        [InlineData(10)]
        public void Get_WhenPassingProductId_ReturnsOneProduct(int prodId)
        {
            var mockProduct= new Product
            {
                Id = prodId,
                Details = new Models.Entities.Base.ProductDetails
                {
                    ModelName = $"Product title {prodId}",
                    Description = $"Product description {prodId}",
                    ModelNumber = $"Product number {prodId}"
                },
                CurrentPrice = prodId,
            } ;
            var mockDataRepository = new Mock<IProductRepo>();
            mockDataRepository
                .Setup(repo => repo.GetOneWithCategoryName(prodId))
                .Returns(() => mockProduct);
            var productController = new ProductController(mockDataRepository.Object);
            var result = (ActionResult<Product>)productController.Get(prodId);
            Assert.NotNull(result);
            var okResult = result.Result as OkObjectResult;
            Assert.NotNull(okResult);
            Assert.Equal(StatusCodes.Status200OK, okResult?.StatusCode);
            Product? product = (Product?)okResult?.Value;
            Assert.NotNull(product);
            Assert.Equal(prodId, product?.Id);
            mockDataRepository.Verify(mock => mock.GetOneWithCategoryName(prodId), Times.Once());
        }
        [Fact]
        public void Get_WhenPassingWrongProductId_Returns404()
        {
            var prodId = 1;
            var wrongProdId = 2;
            var mockProduct = new Product
            {
                Id = prodId,
                Details = new Models.Entities.Base.ProductDetails
                {
                    ModelName = $"Product title {prodId}",
                    Description = $"Product description {prodId}",
                    ModelNumber = $"Product number {prodId}"
                },
                CurrentPrice = prodId,
            };
            var mockDataRepository = new Mock<IProductRepo>();
            mockDataRepository
                .Setup(repo => repo.GetOneWithCategoryName(prodId))
                .Returns(() => mockProduct);
            var productController = new ProductController(mockDataRepository.Object);
            var result = (ActionResult<Product>)productController.Get(wrongProdId);
            Assert.NotNull(result);
            var notFoundResult = result.Result as NotFoundResult;
            Assert.NotNull(notFoundResult);
            Assert.Equal(StatusCodes.Status404NotFound, notFoundResult?.StatusCode);
            mockDataRepository.Verify(mock => mock.GetOneWithCategoryName(wrongProdId), Times.Once());
        }
    }
}
