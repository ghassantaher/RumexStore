using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RumexStore.Dal.EfStructures;
using RumexStore.Dal.Initialization;
using RumexStore.Dal.Repos;
using RumexStore.Models.Entities;
using RumexStore.Service.Controllers;
using RumexStore.Service.Tests.Helpers;
using RumexStore.Service.Tests.TestClasses.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RumexStore.Service.Tests.TestClasses
{
    [Collection("Database collection")]
    public class SearchControllerTests
    {
        DatabaseFixtureMainDatabaseMultiClasses fixture;
        public SearchControllerTests(DatabaseFixtureMainDatabaseMultiClasses fixture)
        {
            this.fixture = fixture;
            this.fixture.RootAddress = "api/product";
            var options = new DbContextOptionsBuilder<StoreDbContext>().UseInMemoryDatabase(databaseName: "WorldCities").Options;
            using var context = new StoreDbContext(options);
            EntitiesHelper.ClearProducts(context);
            EntitiesHelper.AddProducts(context, 1, 1, 2);
        }
        /// <summary>
        /// Test the Search method
        /// </summary>
        [Fact(Skip = "fix it")]
        public void Search_SearchingExistingOneItem_ReturnsOneItemResult()
        {
            //Arrange
            var searchText = "title-1";
            var options = new DbContextOptionsBuilder<StoreDbContext>().UseInMemoryDatabase(databaseName: "WorldCities").Options;
            using var context = new StoreDbContext(options);
            var repo = new ProductRepo(context);

            var controller = new SearchController(repo);


            // Act
            var foundProducts = controller.Search(searchText).Value;

            // Assert
            Assert.NotNull(foundProducts);
            Assert.True(foundProducts?.Count() == 1);
            var foundProduct = foundProducts![0];
            Assert.NotNull(foundProduct);
            Assert.True(foundProduct?.Details != null);
            Assert.True(foundProduct!.Details.ModelName.Contains(searchText) || foundProduct.Details.Description.Contains(searchText));
        }

        [Fact(Skip = "fix it")]
        public void Search_SearchingExistingMultiItems_ReturnsMultiItemsResult()
        {
            //Arrange
            var searchText = "title";
            var options = new DbContextOptionsBuilder<StoreDbContext>().UseInMemoryDatabase(databaseName: "WorldCities").Options;
            using var context = new StoreDbContext(options);
            var repo = new ProductRepo(context);

            var controller = new SearchController(repo);

            // Act
            var foundProducts = controller.Search(searchText).Value;

            // Assert
            Assert.NotNull(foundProducts);
            if(foundProducts != null)
            {
                Assert.True(foundProducts.Count() == 2);
                foreach (var foundProduct in foundProducts)
                {
                    Assert.True(foundProduct.Details != null);
                    if(foundProduct.Details != null)
                    {
                        Assert.True(foundProduct.Details.ModelName.Contains(searchText) || foundProduct.Details.Description.Contains(searchText));
                    }
                }
            }
        }
        [Fact(Skip = "fix it")]
        public void Search_SearchingNonExistingItem_ReturnsNullResult()
        {
            //Arrange
            var searchText = "title1";
            var options = new DbContextOptionsBuilder<StoreDbContext>().UseInMemoryDatabase(databaseName: "WorldCities").Options;
            using var context = new StoreDbContext(options);
            var repo = new ProductRepo(context);

            var controller = new SearchController(repo);


            // Act
            var foundProducts = controller.Search(searchText);

            // Assert
            Assert.NotNull(foundProducts);
            Assert.NotNull(foundProducts.Result);
            var noContentResult = foundProducts.Result as NoContentResult;
            Assert.NotNull(noContentResult);
            Assert.True(noContentResult?.StatusCode == StatusCodes.Status204NoContent);
            Assert.Null(foundProducts.Value);
        }
    }
}
