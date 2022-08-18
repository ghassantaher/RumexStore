using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RumexStore.Dal.Exceptions
{
    public class RumexStoreInvalidProductException : RumexStoreException
    {
        public RumexStoreInvalidProductException() { }
        public RumexStoreInvalidProductException(string message) : base(message) { }
        public RumexStoreInvalidProductException(string message, Exception innerException)
            : base(message, innerException) { }
    }
}
