using Dapper;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using PropertyApi.Models.Property;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PropertyApi.Models
{
    public class PropertyModel
    {
        public int Id { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int Zipcode { get; set; }
        public int Rent { get; set; }
        public string StorageKey { get; set; }
        [JsonIgnore]
        public string Landlord { get; set; }
        public List<FileModel> Files { get; set; }

        public static List<PropertyModel> GetAll(string userId)
        {
            var conn = DataConnection.GetConnection();
            using (conn)
            {
                var sql = "select * from property where landlord = @userId order by id desc";
                return conn.Query<PropertyModel>(sql, new { userId }).ToList();
            }
        }

        public static PropertyModel GetById(int id, string userId)
        {
            var conn = DataConnection.GetConnection();
            using (conn)
            {
                var sql = "select * from property where id = @id and landlord = @userId";
                return conn.Query<PropertyModel>(sql, new { id, userId }).FirstOrDefault();
            }
        }

        public static dynamic AddItem(PropertyModel property, string userId)
        {
            var conn = DataConnection.GetConnection();
            using (conn)
            {
                var sql = @"insert into property (
                    address,
                    city,
                    state,
                    zipcode,
                    rent,
                    landlord,
                    storageKey
                ) 
                values (
                    @Address,
                    @City,
                    @State,
                    @Zipcode,
                    @Rent,
                    @Landlord,
                    @StorageKey
                ) returning id;";

                var id = conn.ExecuteScalar<int>(sql, property);
                var files = property.Files;

                foreach (var file in files)
                {
                    file.CreatedDate = DateTime.UtcNow;
                    file.StorageKey = property.StorageKey;
                    file.StorageBucket = "property-files-dev";
                    file.PropertyId = id;
                    file.FileUrl = $"https://s3.amazonaws.com/{file.StorageBucket}/{file.StorageKey}/{file.FileName}";

                    // todo: insert file index
                    var sql2 = @"insert into propertyfile (
                        propertyid,
                        filename,
                        storagekey,
                        storagebucket,
                        createddate
                    )
                    values (
                        @PropertyId,
                        @FileName,
                        @StorageKey,
                        @StorageBucket,
                        @CreatedDate
                    );";

                    conn.Execute(sql2, 
                        new {
                            PropertyId = file.PropertyId,
                            FileName = file.FileName,
                            StorageKey = file.StorageKey,
                            StorageBucket = file.StorageBucket,
                            CreatedDate = file.CreatedDate
                        }
                    );
                }

                return new { id };
            }
        }
    }
}
