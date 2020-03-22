using System;
using System.Collections.Generic;
using System.Text;

namespace Adventures.Common.Extensions
{
    public static class ServiceProviderExtensions
    {
        public static T GetService<T>(this IServiceProvider provider)
        {
            var result = provider?.GetService(typeof(T));
            if (result == null)
                return default(T);

            return (T)result;
        }
    }
}
