using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RumexStore.Service.Tests.Helpers
{
    public static class SqlServerHelpers
    {
        public static DbContextOptions<T> CreateOriginalDatabaseOptions<T>(this object callingClass, string origConnectionString, Action<DbContextOptionsBuilder<T>> builder = null)
            where T : DbContext
        {
            return CreateOptionWithOriginalDatabaseName(origConnectionString, null, builder).Options;
        }
        private static DbContextOptionsBuilder<T> CreateOptionWithOriginalDatabaseName<T>(string origConnectionString,
            //object callingClass,
            string callingMember, Action<DbContextOptionsBuilder<T>> extraOptions)
            where T : DbContext
        {
            var builder = new DbContextOptionsBuilder<T>();
            builder.UseSqlServer(origConnectionString, option => option.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null));
            builder.ApplyOtherOptionSettings();
            extraOptions?.Invoke(builder);

            return builder;
        }
        internal static void ApplyOtherOptionSettings<T>(this DbContextOptionsBuilder<T> builder)
            where T : DbContext
        {
            builder
                .EnableDetailedErrors()
                .EnableSensitiveDataLogging();
        }
    }
}
