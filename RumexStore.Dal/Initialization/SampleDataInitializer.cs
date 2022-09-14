﻿using Microsoft.AspNetCore.Builder;
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
        public static void DropAndCreateDatabase(StoreDbContext context)
        {
            context.Database.EnsureDeleted();
            //This doesn't run the migrations, so SQL objects will be missing
            //DON'T USE THIS => context.Database.EnsureCreated();
            context.Database.Migrate();
        }

        internal static void ResetIdentity(StoreDbContext context)
        {
            var tables = new[] {"Categories","Customers",
        "OrderDetails","Orders","Products","ShoppingCartRecords"};
            foreach (var itm in tables)
            {
                FormattableString rawSqlString = $"DBCC CHECKIDENT (\"Store.{itm}\", RESEED, 0);";
#pragma warning disable EF1000 // Possible SQL injection vulnerability.
                //_ghtcontext.Database.ExecuteSqlCommand(rawSqlString);
                //var aa = context.Database.ExecuteSqlInterpolated(rawSqlString);
                //context.Database.ExecuteSqlInterpolated($"DBCC CHECKIDENT (\"Store.{itm}\", RESEED, 0);");
#pragma warning restore EF1000 // Possible SQL injection vulnerability.
            }
        }
        public static void ClearData(StoreDbContext context)
        {
            //context.Database.ExecuteSqlCommand("Delete from Store.Categories");
            //context.Database.ExecuteSqlCommand("Delete from Store.Customers");
            context.Database.ExecuteSqlInterpolated($"Delete from Store.Categories");
            //context.Database.ExecuteSqlInterpolated($"Delete from Store.Customers");
            context.Database.ExecuteSqlInterpolated($"Delete from Store.Categories");
            ResetIdentity(context);
        }


        internal static void SeedData(StoreDbContext context)
        {
            try
            {
                if (!context.Categories.Any())
                {
                    context.Categories.AddRange(SampleData.GetCategories());
                    context.SaveChanges();
                }
                //if (!context.Customers.Any())
                //{
                //    var prod1 = context.Categories
                //        .Include(c => c.Products).FirstOrDefault()?
                //        .Products?.Skip(3).FirstOrDefault();
                //    var prod2 = context.Categories.Skip(2)
                //        .Include(c => c.Products).FirstOrDefault()?
                //        .Products?.Skip(2).FirstOrDefault();
                //    var prod3 = context.Categories.Skip(5)
                //        .Include(c => c.Products).FirstOrDefault()?
                //        .Products?.Skip(1).FirstOrDefault();
                //    var prod4 = context.Categories.Skip(2)
                //        .Include(c => c.Products).FirstOrDefault()?
                //        .Products?.Skip(1).FirstOrDefault();


                //    var products = new List<Product>();
                //    if (prod1 != null) products.Add(prod1);
                //    if (prod2 != null) products.Add(prod2);
                //    if (prod3 != null) products.Add(prod3);
                //    if (prod4 != null) products.Add(prod4);
                //    var allCustomerRecords = SampleData.GetAllCustomerRecords(products);
                //    if (allCustomerRecords != null)
                //    {
                //        context.Customers.AddRange(allCustomerRecords);
                //    }
                //    context.SaveChanges();
                //}
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
            context.Database.Migrate();
            //ClearData(context);
            SeedData(context);
        }

    }
}
