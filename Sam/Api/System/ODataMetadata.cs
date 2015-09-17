using System.Collections.Generic;
using System.Linq;

namespace Sam.Api
{
    public class ODataMetadata<T> where T : class
    {
        private readonly long? _count;
        private readonly IEnumerable<T> _result;

        public ODataMetadata(IEnumerable<T> result, long? count)
        {
            _count = count;
            _result = result;
        }

        public IEnumerable<T> Results
        {
            get { return _result; }
        }

        public long? Count
        {
            get { return _count; }
        }
    }

    public class ODataMetadata
    {
        private readonly long? _count;
        private readonly IQueryable _result;

        public ODataMetadata(IQueryable result, long? count)
        {
            _count = count;
            _result = result;
        }

        public IQueryable Results
        {
            get { return _result; }
        }

        public long? Count
        {
            get { return _count; }
        }
    }

}