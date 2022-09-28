using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RumexStore.Dal.EfStructures;
using RumexStore.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RumexStore.Dal.Initialization
{
    public static class SampleDataInitializer
    {
        private static string[] tables = new[] { "Categories",/*"Customers", "OrderDetails","Orders",*/"Products"/*,"ShoppingCartRecords"*/};
        public static void DropAndCreateDatabase(StoreDbContext context)
        {
            context.Database.EnsureDeleted();
            //This doesn't run the migrations, so SQL objects will be missing
            //DON'T USE THIS => context.Database.EnsureCreated();
            context.Database.Migrate();
        }

        internal static void ResetIdentity(StoreDbContext context)
        {
            foreach (var itm in tables)
            {
//                FormattableString rawSqlString = $"DBCC CHECKIDENT (\"Store.{itm}\", RESEED, 0);";
#pragma warning disable EF1000 // Possible SQL injection vulnerability.
                var item = $"Store.{itm}";
                FormattableString rawSqlString = $"DBCC CHECKIDENT ({item}, RESEED, 0);";
                context.Database.ExecuteSqlInterpolated(rawSqlString);
#pragma warning restore EF1000 // Possible SQL injection vulnerability.
            }
        }
        public static void ClearData(StoreDbContext context)
        {
            foreach (var itm in tables)
            {
#pragma warning disable EF1000 // Possible SQL injection vulnerability.
                var item = $"Store.{itm}";
                FormattableString rawSqlString = $"Delete From [{item}];";
                context.Database.ExecuteSqlRaw($"Delete From {item};");
                //context.Database.ExecuteSqlInterpolated(rawSqlString);
#pragma warning restore EF1000 // Possible SQL injection vulnerability.
            }
            //context.Database.ExecuteSqlInterpolated($"Delete from Store.Products");
            //context.Database.ExecuteSqlInterpolated($"Delete from Store.Categories");
            ResetIdentity(context);
        }


        public static void SeedData(StoreDbContext context)
        {
            try
            {
                if (!context.Categories.Any())
                {
                    context.Categories.AddRange(SampleData.GetCategories());
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }
        public static void InitializeData(/*StoreDbContext context*/IApplicationBuilder app)
        {
            StoreDbContext context = app.ApplicationServices
                .CreateScope().ServiceProvider.GetRequiredService<StoreDbContext>();
            //Ensure the database exists and is up to date
            InitializeData(context);
        }
        public static void InitializeData(StoreDbContext context)
        {
            //Ensure the database exists and is up to date
            context.Database.Migrate();
            ClearData(context);
            SeedData(context);
        }

    }
}
