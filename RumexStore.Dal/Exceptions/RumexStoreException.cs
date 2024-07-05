using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RumexStore.Dal.Exceptions
{
    public class RumexStoreException : Exception
    {
        public RumexStoreException() { }
        public RumexStoreException(string message) : base(message) { }
        public RumexStoreException(string message, Exception innerException)
            : base(message, innerException) { }
    }
}
