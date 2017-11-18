using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PropertyApi.Models.Property
{
    public class FileModel
    {
        public int PropertyId { get; set; }
        public string FileName { get; set; }
        public int FileIndex { get; set; }
        public string StorageKey { get; set; }
        public string StorageBucket { get; set; }
        public DateTime CreatedDate { get; set; }
        public string FileUrl { get; set; }
    }
}
