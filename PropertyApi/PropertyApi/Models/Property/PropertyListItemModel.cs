using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PropertyApi.Models.Property
{
    public class PropertyListItemModel
    {
        public int Id { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int Zipcode { get; set; }
        public int Rent { get; set; }
        public string StorageBucket { get; set; }
        public string StorageKey { get; set; }
        public string FileName { get; set; }
    }
}
