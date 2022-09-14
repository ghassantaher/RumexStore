using Microsoft.EntityFrameworkCore;
using RumexStore.Dal.EfStructures;
using RumexStore.Dal.Initialization;
using RumexStore.Dal.Tests.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RumexStore.Dal.Tests.ContextTests
{
    public class DatabaseFixture : IDisposable
    {
        public DatabaseFixture()
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
