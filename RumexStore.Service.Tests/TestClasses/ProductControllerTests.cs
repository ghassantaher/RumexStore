using Newtonsoft.Json;
using RumexStore.Models.Entities;
using RumexStore.Service.Tests.TestClasses.Base;
using RumexStore.Service.Tests.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

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
        }

        [Fact]
        public async void ShouldGetOneProductWithCategoryName()
        {
            //Get One Product With Category Name: http://localhost:55882/api/product/2
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync($"{this.fixture.ServiceAddress}{this.fixture.RootAddress}/2");
                Assert.True(response.IsSuccessStatusCode, response.ReasonPhrase);
                var jsonResponse = await response.Content.ReadAsStringAsync();
                var productWithCategoryName = JsonConvert.DeserializeObject<ProductViewModel>(jsonResponse);
                Assert.Equal("Persuasive Pencil", productWithCategoryName.Details.ModelName);
                Assert.Equal("Communications", productWithCategoryName.CategoryName);
            }
        }

        [Fact]
        public async void ShouldFailIfBadProductId()
        {
            //Get One Product with Category Name: http://localhost:55882/api/product/1
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync($"{this.fixture.ServiceAddress}{this.fixture.RootAddress}/100");
                //Assert.True(response.IsSuccessStatusCode, response.ReasonPhrase);
                Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
            }
        }
    }
}
