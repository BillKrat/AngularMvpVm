using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.IO;

namespace Adventures.Common.Configuration
{
    public class DefaultConfigurationManager : IConfigurationManager
    {
        private IConfiguration _configuration;
        private string _connectionString;

         public DefaultConfigurationManager(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GetConnectionString(string connectionName = null, bool bypassExternal = false)
        {

            if (connectionName == null && _connectionString != null)
                return _connectionString;

            _connectionString = _configuration.GetConnectionString(connectionName);
            if (bypassExternal) return _connectionString;

            // If the %appdata%/<connectionName>/login-info.txt file exists then 
            // we'll use its ConnectionString value (assuming json file) overriding 
            // the appsettings.json value for the "connectionName" connection string
            var appDataFolder = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);
            var apiFile = $@"{appDataFolder}\{connectionName}\login-info.txt";
            if (File.Exists(apiFile))
            {
                try
                {
                    var content = File.ReadAllText(apiFile);
                    JObject data = (JObject) JsonConvert.DeserializeObject(content);
                    JValue fileConnection = (JValue) data["ConnectionString"];
                    _connectionString = fileConnection.Value<string>();
                }
                catch { /* Do not allow errors to crash process */ }
            }
            return _connectionString;
        }
    }
}
