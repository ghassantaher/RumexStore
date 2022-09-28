using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RumexStore.Dal.EfStructures;
using RumexStore.Dal.Initialization;
using RumexStore.Dal.Tests.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RumexStore.Dal.Tests.TestClasses.Fixtures
{
    abstract public class DatabaseFixtureTestDatabaseSingleClass : IDisposable
    {
        private readonly string uniqueName;
        private readonly IConfigurationRoot configurationRoot;
        public DatabaseFixtureTestDatabaseSingleClass(IConfigurationRoot configurationRoot, string uniqueName)
        {
            this.uniqueName = uniqueName;
            this.configurationRoot = configurationRoot;
            var origConnectionString = configurationRoot["ConnectionStrings:UnitTestsStoreConnection"];
            _options = this.CreateUniqueNameOptions<StoreDbContext>(origConnectionString, uniqueName);

            using var context = new StoreDbContext(_options);
            context.Database.EnsureCreated();
            // ... initialize data in the test database ...
        }

        public void Dispose()
        {
            //    // ... clean up test data from the database ...
            using var context = new StoreDbContext(_options);
            context.Database.EnsureDeleted();
            context.Dispose();
        }

        //public SqlConnection Db { get; private set; }
        public DbContextOptions<StoreDbContext> _options { get; private set; }
        public void CleanDatabase(StoreDbContext context)
        {
            SampleDataInitializer.ClearData(context);
        }
    }
}
