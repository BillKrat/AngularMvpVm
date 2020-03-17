using System;
using System.Collections.Generic;
using System.Text;

namespace Adventures.Common.Configuration
{
    public interface IConfigurationManager
    {
        string GetConnectionString(string connectionName, bool bypassExternalFile=false);
    }
}
