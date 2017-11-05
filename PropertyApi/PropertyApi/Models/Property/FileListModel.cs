using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PropertyApi.Models.Property
{
    public class FileListModel
    {
        public List<IFormFile> files { get; set; }
        public Guid guid { get; set; }
    }
}
