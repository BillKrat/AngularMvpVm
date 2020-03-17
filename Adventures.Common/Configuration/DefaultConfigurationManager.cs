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

        public DefaultConfigurationManager(){ }

        public DefaultConfigurationManager(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GetConnectionString(string connectionName, bool bypassExternal = false)
        {
            var connection = _configuration.GetConnectionString(connectionName);
            if (bypassExternal) return connection;

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
                    connection = fileConnection.Value<string>();
                }
                catch { /* Do not allow errors to crash process */ }
            }
            return connection;
        }
    }
}
