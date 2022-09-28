using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RumexStore.Dal.Tests.ContextTests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace RumexStore.Dal.Tests.Helpers
{
    public static class SqlServerHelpers
    {
        public const string RequiredEndingToUnitTestDatabaseName = "Test";
        public const string RequiredEndingToTestExtraDatabaseName = "Tests";
        public const string UnitTestConnectionStringName = "UnitTestConnection";
        public const string AppSettingFilename = "secrets.json";
        /// <summary>
        /// This creates the DbContextOptions  options for a SQL server database, 
        /// where the database name is formed using the appsetting's UnitTestConnection with the class name as a prefix.
        /// That is, the database is unique to the object provided
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="callingClass">this should be this, i.e. the test class you are in</param>
        /// <param name="builder">Optional: action that allows you to add extra options to the builder</param>
        /// <returns></returns>
        public static DbContextOptions<T> CreateUniqueClassOptions<T>(this object callingClass, string origConnectionString, Action<DbContextOptionsBuilder<T>> builder = null)
            where T : DbContext
        {
            return CreateOptionWithDatabaseName(origConnectionString, callingClass, null, builder).Options;
        }
        public static DbContextOptions<T> CreateUniqueNameOptions<T>(this object callingClass, string origConnectionString, string uniqueName, Action<DbContextOptionsBuilder<T>> builder = null)
            where T : DbContext
        {
            return CreateOptionWithDatabaseName(origConnectionString, callingClass, null, builder, uniqueName: uniqueName).Options;
        }
        /// <summary>
        /// This creates the DbContextOptions options for a SQL server database, 
        /// where the database name is formed using the appsetting's DefaultConnection with the class name and the calling method's name as as a prefix.
        /// That is, the database is unique to the calling method.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="callingClass">this should be this, i.e. the class you are in</param>
        /// <param name="builder">Optional: action that allows you to add extra options to the builder</param>
        /// <param name="callingMember">Do not use: this is filled in by compiler</param>
        /// <returns></returns>
        public static DbContextOptions<T> CreateUniqueMethodOptions<T>(this object callingClass, string origConnectionString,
            Action<DbContextOptionsBuilder<T>> builder = null,
            [CallerMemberName] string callingMember = "") where T : DbContext
        {
            return CreateOptionWithDatabaseName<T>(origConnectionString, callingClass, callingMember, builder).Options;
        }
        /// <summary>
        /// This will ensure an empty database by deleting the current database and recreating it
        /// </summary>
        /// <param name="context"></param>
        public static void CreateEmptyViaDelete(this DbContext context)
        {
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
        }
        internal static void ApplyOtherOptionSettings<T>(this DbContextOptionsBuilder<T> builder)
            where T : DbContext
        {
            builder
                .EnableDetailedErrors()
                .EnableSensitiveDataLogging();
        }
        /// <summary>
        /// This creates a unique SQL Server database name based on the test class name, and an optional extra name
        /// </summary>
        /// <param name="testClass">This should be 'this' in the test, which means the class name is added to the end of the database name</param>
        /// <param name="optionalMethodName">This is an optional string which, if present, is added to the end of the database name</param>
        /// <param name="separator">Optional (defaults to _). This is the character used to separate each part of the formed name</param>
        /// <returns></returns>
        public static string GetUniqueDatabaseConnectionString(this object testClass, string origConnectionString, string optionalMethodName = null, char separator = '_', string uniqueName = "")
        {
            if (string.IsNullOrEmpty(origConnectionString))
                throw new InvalidOperationException($"You are missing a connection string of name '{UnitTestConnectionStringName}' in the {AppSettingFilename} file.");
            var builder = new SqlConnectionStringBuilder(origConnectionString);
            var extraDatabaseName = string.IsNullOrEmpty(uniqueName) ? $"{separator}{testClass.GetType().Name}" : $"{separator}{uniqueName}";
            if (string.IsNullOrEmpty(uniqueName) && !string.IsNullOrEmpty(optionalMethodName)) extraDatabaseName += $"{separator}{optionalMethodName}";

            if (!builder.InitialCatalog.EndsWith(RequiredEndingToUnitTestDatabaseName) &&
                !extraDatabaseName.EndsWith(RequiredEndingToTestExtraDatabaseName))
                throw new InvalidOperationException($"The database name in your connection string must end with '{RequiredEndingToUnitTestDatabaseName}', but is '{builder.InitialCatalog}'." +
                    " This is a safety measure to help stop DeleteAllUnitTestDatabases from deleting production databases.");

            builder.InitialCatalog += extraDatabaseName;

            return builder.ToString();
        }        //------------------------------------
        //private methods

        private static DbContextOptionsBuilder<T> CreateOptionWithDatabaseName<T>(string origConnectionString, object callingClass,
            string callingMember, Action<DbContextOptionsBuilder<T>> extraOptions, string uniqueName = "")
            where T : DbContext
        {
            //var connectionString = configuration["ConnectionStrings:RumexStoreConnection"];
            var connectionString = callingClass.GetUniqueDatabaseConnectionString(origConnectionString, callingMember, uniqueName: uniqueName);
            var builder = new DbContextOptionsBuilder<T>();
            builder.UseSqlServer(connectionString, option => option.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null));
            builder.ApplyOtherOptionSettings();
            extraOptions?.Invoke(builder);

            return builder;
        }
    }
}
