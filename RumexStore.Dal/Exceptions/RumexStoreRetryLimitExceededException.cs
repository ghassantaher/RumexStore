using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RumexStore.Dal.Exceptions
{
    public class RumexStoreRetryLimitExceededException : RumexStoreException
    {
        public RumexStoreRetryLimitExceededException() { }
        public RumexStoreRetryLimitExceededException(string message) : base(message) { }
        public RumexStoreRetryLimitExceededException(string message, Exception innerException)
            : base(message, innerException) { }
    }
}
