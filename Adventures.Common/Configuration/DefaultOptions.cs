using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;

namespace Adventures.Common.Configuration
{
    public class DefaultOptions : IOptions<DefaultOptions>
    {
        private DefaultOptions _defaultOptions;

        public DefaultOptions()
        {
            
        }

        public DefaultOptions Value { get { return _defaultOptions; } }
    }
}
