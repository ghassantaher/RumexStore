using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using Newtonsoft.Json;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Math;
using RumexStore.Dal.EfStructures;
using RumexStore.Dal.Initialization;
using RumexStore.Dal.Repos;
using RumexStore.Dal.Repos.Interfaces;
using RumexStore.Models.Entities;
using RumexStore.Service.Controllers;
using RumexStore.Service.Tests.Helpers;
using RumexStore.Service.Tests.TestClasses.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Product = RumexStore.Models.Entities.Product;

namespace RumexStore.Service.Tests.TestClasses
{
    [Collection("Database collection")]
    public class CategoryControllerTests     
    {
        DatabaseFixtureMainDatabaseMultiClasses fixture;
        public CategoryControllerTests(DatabaseFixtureMainDatabaseMultiClasses fixture)
        {
            this.fixture = fixture;
            this.fixture.RootAddress = "api/category";
            var options = new DbContextOptionsBuilder<StoreDbContext>().UseInMemoryDatabase(databaseName: "WorldCities").Options;
            using var context = new StoreDbContext(options);
            EntitiesHelper.ClearProducts(context);
            EntitiesHelper.AddProducts(context, 1, 1, 2);
        }
        [Fact(Skip = "test should execute only if services are running")]
        public async void ShouldGetAllCategoriesAsync()
        {
            //Get All Categories: http://localhost:7092/api/category
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync($"{this.fixture.ServiceAddress}{this.fixture.RootAddress}");
                Assert.True(response.IsSuccessStatusCode);
                var jsonResponse = await response.Content.ReadAsStringAsync();
                var cats = JsonConvert.DeserializeObject<List<Category>>(jsonResponse);
                Assert.NotNull(cats);
                Assert.True(cats?.Count>1);
            }
        }
        //[Fact]
        //public void ShouldGetAllCategories()
        //{
        //    //Arrange
        //    var options = new DbContextOptionsBuilder<StoreDbContext>().UseInMemoryDatabase(databaseName: "WorldCities").Options;
        //    using var context = new StoreDbContext(options);
        //    EntitiesHelper.AddProducts(context, 2, 3, 4);
        //    var repo = new CategoryRepo(context);

        //    var controller = new CategoryController(repo);

        //    // Act
        //    var foundCategories = controller.Get();

        //    // Assert
        //    Assert.NotNull(foundCategories);
        //    Assert.NotNull(foundCategories.Result);
        //    var okObjectResult = foundCategories.Result as OkObjectResult;
        //    Assert.NotNull(okObjectResult);
        //    Assert.True(okObjectResult?.StatusCode == StatusCodes.Status200OK);
        //    Assert.NotNull(okObjectResult?.Value);
        //    Assert.True((okObjectResult?.Value as List<Category>)?.Count() == 2);
        //}

        [Theory(Skip = "test should execute only if services are running")]
        [InlineData(1, "Communications")]
        [InlineData(2, "Deception")]
        [InlineData(3, "Travel")]
        [InlineData(4, "Protection")]
        [InlineData(5, "Munitions")]
        [InlineData(6, "Tools")]
        [InlineData(7, "General")]
        public async void ShouldGetOneCategoryAsync(int catId, string categoryName)
        {
            //Get One Category: http://localhost:55882/api/category/1
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync($"{this.fixture.ServiceAddress}{this.fixture.RootAddress}/{catId}");
                Assert.True(response.IsSuccessStatusCode);
                var jsonResponse = await response.Content.ReadAsStringAsync();
                var cat = JsonConvert.DeserializeObject<Category>(jsonResponse);
                Assert.Equal(categoryName, cat?.CategoryName);
            }
        }
        //[Theory]
        //[InlineData(1, "cat-1")]
        //[InlineData(2, "cat-2")]
        //[InlineData(3, "cat-3")]
        //[InlineData(4, "cat-4")]
        //[InlineData(5, "cat-5")]
        //[InlineData(6, "cat-6")]
        //[InlineData(7, "cat-7")]
        //public void ShouldGetOneCategory(int catId, string categoryName)
        //{
        //    //Arrange
        //    var options = new DbContextOptionsBuilder<StoreDbContext>().UseInMemoryDatabase(databaseName: "WorldCities").Options;
        //    using var context = new StoreDbContext(options);
        //    EntitiesHelper.AddProducts(context,categoryId: 2, productStartId: 3, productEndId: 3);
        //    EntitiesHelper.AddProducts(context, categoryId: 3, productStartId: 4, productEndId: 4);
        //    EntitiesHelper.AddProducts(context, categoryId: 4, productStartId: 5, productEndId: 5);
        //    EntitiesHelper.AddProducts(context, categoryId: 5, productStartId: 6, productEndId: 6);
        //    EntitiesHelper.AddProducts(context, categoryId: 6, productStartId: 7, productEndId: 7);
        //    EntitiesHelper.AddProducts(context, categoryId: 7, productStartId: 8, productEndId: 8);
        //    var repo = new CategoryRepo(context);

        //    var controller = new CategoryController(repo);

        //    // Act
        //    var category = controller.Get(catId);

        //    // Assert
        //    Assert.NotNull(category);


        //    Assert.NotNull(category.Result);
        //    var okObjectResult = category.Result as OkObjectResult;
        //    Assert.NotNull(okObjectResult);
        //    Assert.True(okObjectResult?.StatusCode == StatusCodes.Status200OK);
        //    Assert.NotNull(okObjectResult?.Value);
        //    Assert.True((okObjectResult?.Value as Category)?.Id == catId);
        //    Assert.True((okObjectResult?.Value as Category)?.CategoryName == categoryName);
        //}

        [Fact(Skip = "test should execute only if services are running")]
        public async void ShouldFailIfBadCategoryIdAsync()
        {
            //Get One Category: http://localhost:55882/api/category/0
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync($"{this.fixture.ServiceAddress}{this.fixture.RootAddress}/100");
                Assert.False(response.IsSuccessStatusCode);
                Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
            }
        }

        //[Fact]
        //public void ShouldFailIfBadCategoryId()
        //{
        //    var catId = 99;
        //    var options = new DbContextOptionsBuilder<StoreDbContext>().UseInMemoryDatabase(databaseName: "WorldCities").Options;
        //    using var context = new StoreDbContext(options);
        //    EntitiesHelper.AddProducts(context, categoryId: 2, productStartId: 3, productEndId: 3);
        //    EntitiesHelper.AddProducts(context, categoryId: 3, productStartId: 4, productEndId: 4);
        //    EntitiesHelper.AddProducts(context, categoryId: 4, productStartId: 5, productEndId: 5);
        //    EntitiesHelper.AddProducts(context, categoryId: 5, productStartId: 6, productEndId: 6);
        //    EntitiesHelper.AddProducts(context, categoryId: 6, productStartId: 7, productEndId: 7);
        //    EntitiesHelper.AddProducts(context, categoryId: 7, productStartId: 8, productEndId: 8);
        //    var repo = new CategoryRepo(context);

        //    var controller = new CategoryController(repo);

        //    // Act
        //    var category = controller.Get(catId);

        //    // Assert
        //    Assert.NotNull(category);


        //    Assert.NotNull(category.Result);
        //    var notFoundResult = category.Result as NotFoundResult;
        //    Assert.NotNull(notFoundResult);
        //    Assert.True(notFoundResult?.StatusCode == StatusCodes.Status404NotFound);
        //}

        [Theory(Skip = "test should execute only if services are running")]
        [InlineData(1, 5)]
        [InlineData(2, 5)]
        [InlineData(3, 6)]
        [InlineData(4, 6)]
        [InlineData(5, 3)]
        [InlineData(6, 7)]
        [InlineData(7, 9)]
        public async void ShouldGetProductsForACategoryAsync(int catId, int productsCount)
        {
            //Get Products For Category: http://localhost:55882/api/category/{id}/products
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync($"{this.fixture.ServiceAddress}{this.fixture.RootAddress}/{catId}/products");
                Assert.True(response.IsSuccessStatusCode);
                var jsonResponse = await response.Content.ReadAsStringAsync();
                var prods = JsonConvert.DeserializeObject<IList<Product>>(jsonResponse);
                Assert.Equal(productsCount, prods?.Count);

            }
        }
        //[Theory]
        //[InlineData(1, 2)]
        //[InlineData(2, 1)]
        //[InlineData(3, 1)]
        //[InlineData(4, 1)]
        //[InlineData(5, 1)]
        //[InlineData(6, 1)]
        //[InlineData(7, 1)]
        //public void ShouldGetProductsForACategory(int catId, int productsCount)
        //{
        //    //Arrange
        //    var options = new DbContextOptionsBuilder<StoreDbContext>().UseInMemoryDatabase(databaseName: "WorldCities").Options;
        //    using var context = new StoreDbContext(options);
        //    EntitiesHelper.AddProducts(context, categoryId: 2, productStartId: 3, productEndId: 3);
        //    EntitiesHelper.AddProducts(context, categoryId: 3, productStartId: 4, productEndId: 4);
        //    EntitiesHelper.AddProducts(context, categoryId: 4, productStartId: 5, productEndId: 5);
        //    EntitiesHelper.AddProducts(context, categoryId: 5, productStartId: 6, productEndId: 6);
        //    EntitiesHelper.AddProducts(context, categoryId: 6, productStartId: 7, productEndId: 7);
        //    EntitiesHelper.AddProducts(context, categoryId: 7, productStartId: 8, productEndId: 8);
        //    var catRepo = new CategoryRepo(context);
        //    var prodRepo = new ProductRepo(context);

        //    var controller = new CategoryController(catRepo);

        //    // Act
        //    var products = controller.GetProductsForCategory(prodRepo, catId).Value;

        //    // Assert
        //    Assert.NotNull(products);
        //    Assert.True(products?.Count() == productsCount);
        //    foreach (var product in products!)
        //    {
        //        Assert.True(product.Details != null);
        //        Assert.True(product.CategoryId == catId);
        //    }
        //}
        //[Fact]
        //public void Get_WhenNoParameters_ReturnsAllCategories()
        //{
        //    var mockCategories = new List<Category>();
        //    for (int i = 1; i <= 10; i++)
        //    {
        //        mockCategories.Add(new Category
        //        {
        //            Id = i,
        //            CategoryName = $"Category name {i}",
        //        });
        //    }
        //    var mockDataRepository = new Mock<ICategoryRepo>();
        //    mockDataRepository
        //        .Setup(repo => repo.GetAll())
        //        .Returns(() => mockCategories.AsEnumerable());
        //    var categoriesController = new CategoryController(mockDataRepository.Object);
        //    var categories = categoriesController.Get();
        //    Assert.NotNull(categories.Result);
        //    var okObjectResult = categories.Result as OkObjectResult;
        //    Assert.NotNull(okObjectResult);
        //    Assert.True(okObjectResult?.StatusCode == StatusCodes.Status200OK);
        //    Assert.NotNull(okObjectResult?.Value);
        //    Assert.True((okObjectResult?.Value as List<Category>)?.Count() == 10);
        //    mockDataRepository.Verify(mock => mock.GetAll(), Times.Once());
        //}
        //[Theory]
        //[InlineData(1)]
        //[InlineData(2)]
        //[InlineData(3)]
        //[InlineData(4)]
        //[InlineData(5)]
        //[InlineData(6)]
        //[InlineData(7)]
        //[InlineData(8)]
        //[InlineData(9)]
        //[InlineData(10)]
        //public void Get_WhenPassingCategoryId_ReturnsOneCategory(int catId)
        //{

        //    var mockCategory = new Category
        //    {
        //        Id = catId,
        //        CategoryName = $"Category name {catId}",
        //    };
        //    var mockDataRepository = new Mock<ICategoryRepo>();
        //    mockDataRepository
        //        .Setup(repo => repo.Find(catId))
        //        .Returns(() => mockCategory);
        //    var categoriesController = new CategoryController(mockDataRepository.Object);
        //    var result = (ActionResult<Category>)categoriesController.Get(catId);
        //    Assert.NotNull(result);
        //    var okResult = result.Result as OkObjectResult;
        //    Assert.NotNull(okResult);
        //    Assert.Equal(StatusCodes.Status200OK, okResult?.StatusCode);
        //    Category? category = (Category?)okResult?.Value;
        //    Assert.NotNull(category);
        //    Assert.Equal(catId, category?.Id);
        //    mockDataRepository.Verify(mock => mock.Find(catId), Times.Once());
        //}
        //[Fact]
        //public void Get_WhenPassingWrongCategoryId_Returns404()
        //{
        //    var catId = 1;
        //    var wrongCatId = 2;
        //    var mockCategory = new Category
        //    {
        //        Id = catId,
        //        CategoryName = $"Category name {catId}",
        //    };
        //    var mockDataRepository = new Mock<ICategoryRepo>();
        //    mockDataRepository
        //        .Setup(repo => repo.Find(catId))
        //        .Returns(() => mockCategory);
        //    var categoriesController = new CategoryController(mockDataRepository.Object);
        //    var result = (ActionResult<Category>)categoriesController.Get(wrongCatId);
        //    Assert.NotNull(result);
        //    var notFoundResult = result.Result as NotFoundResult;
        //    Assert.NotNull(notFoundResult);
        //    Assert.Equal(StatusCodes.Status404NotFound, notFoundResult?.StatusCode);
        //    mockDataRepository.Verify(mock => mock.Find(wrongCatId), Times.Once());
        //}

    }
}
