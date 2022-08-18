using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RumexStore.Dal.Exceptions
{
    public class RumexStoreConcurrencyException : RumexStoreException
    {
        public RumexStoreConcurrencyException() { }
        public RumexStoreConcurrencyException(string message) : base(message) { }
        public RumexStoreConcurrencyException(string message, Exception innerException)
            : base(message, innerException) { }
    }
}
