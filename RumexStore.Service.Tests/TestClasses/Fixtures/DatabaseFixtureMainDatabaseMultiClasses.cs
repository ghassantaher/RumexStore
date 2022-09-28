using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RumexStore.Dal.EfStructures;
using RumexStore.Dal.Initialization;
using RumexStore.Service.Tests.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RumexStore.Service.Tests.TestClasses.Base
{
    public class DatabaseFixtureMainDatabaseMultiClasses : IDisposable
    {
        public DatabaseFixtureMainDatabaseMultiClasses()
        {
            var config = new ConfigurationBuilder()
               .AddUserSecrets<DatabaseFixtureMainDatabaseMultiClasses>()
               .Build();
            var origConnectionString = config["ConnectionStrings:ServiceTestsStoreConnection"];
            _options = this.CreateOriginalDatabaseOptions<StoreDbContext>(origConnectionString);

            using var context = new StoreDbContext(_options);
            context.Database.EnsureCreated();
            SampleDataInitializer.ClearData(context);
            SampleDataInitializer.SeedData(context);
        }

        public void Dispose()
        {
            //    // ... clean up test data from the database ...
            using var context = new StoreDbContext(_options);
            SampleDataInitializer.ClearData(context);
            context.Dispose();

        }

        public string ServiceAddress = "https://localhost:7092/";
        public string RootAddress = String.Empty;
        public DbContextOptions<StoreDbContext> _options { get; private set; }
    }

    [CollectionDefinition("Database collection")]
    public class DatabaseCollection : ICollectionFixture<DatabaseFixtureMainDatabaseMultiClasses>
    {
        // This class has no code, and is never created. Its purpose is simply
        // to be the place to apply [CollectionDefinition] and all the
        // ICollectionFixture<> interfaces.
    }
}
