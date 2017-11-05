using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Amazon.S3;
using Amazon.S3.Model;
using System.IO;
using PropertyApi.Models.Property;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PropertyApi.Controllers
{
    [Route("api/[controller]")]
    public class FilesController : Controller
    {
        private IAmazonS3 _s3Client { get; set; }

        public FilesController (IAmazonS3 s3Client)
        {
            _s3Client = s3Client;
        }

        // POST api/files
        // get pre-signed url for each file to upload directly to S3 from client
        [HttpPost]
        [AllowAnonymous]
        public IActionResult Post(FileListModel fileList)
        {
            var urls = new List<string>();

            try
            {
                foreach (var file in fileList.files)
                {
                    var request = new GetPreSignedUrlRequest
                    {
                        BucketName = "property-files-dev",
                        Key = $"{fileList.guid}/{file.FileName}",
                        Verb = HttpVerb.PUT,
                        Expires = DateTime.Now.AddMinutes(5)
                    };

                    var url = _s3Client.GetPreSignedURL(request);
                    urls.Add(url);
                }

            }
            catch (Exception exc)
            {
                return BadRequest();
            }

            return Ok(new { urls });
        }
    }
}
