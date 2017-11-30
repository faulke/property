using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using PropertyApi.Models.Property;
using PropertyApi.Options;
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

        public static List<PropertyListItemModel> GetAll(string userId)
        {
            var conn = DataConnection.GetConnection();
            using (conn)
            {
                // this returns just the first image for the property from propertyfile
                // todo: return only cover image (fileindex = 0? coverimage = true?)
                var sql = @"
                    select distinct on (pr.id)
                        pr.id,
                        pr.address,
                        pr.city,
                        pr.state,
                        pr.zipcode,
                        pr.rent,
                        pf.storagebucket,
                        pf.storagekey,
                        pf.filename
                    from property as pr
                    left join propertyfile as pf on pr.id = pf.propertyid
	                    where pr.landlord = @userId
                       	and (
                                pf.fileindex = 0
                                or pf.fileindex is null
                            )
                    order by pr.id desc;";
                var result = conn.Query<PropertyListItemModel>(sql, new { userId }).ToList();

                return result;
            }
        }

        public static PropertyModel GetById(int id, string userId)
        {
            var conn = DataConnection.GetConnection();
            using (conn)
            {
                var sql = @"
                    select * from property where 
                        id = @id and 
                        landlord = @userId;
                    select * from propertyfile where
                        propertyid = @id;";

                var result = conn.QueryMultiple(sql, new { id, userId });

                var property = result.Read<PropertyModel>().FirstOrDefault();
                var files = result.Read<FileModel>().ToList();

                property.Files = files;

                return property;
            }
        }

        public static dynamic AddItem(PropertyModel property, string userId, string StorageBucket)
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
                    file.StorageBucket = StorageBucket;
                    file.PropertyId = id;
                    file.FileUrl = $"https://s3-us-west-2.amazonaws.com/{file.StorageBucket}/{file.StorageKey}/{file.FileName}";

                    // todo: insert file index
                    var sql2 = @"insert into propertyfile (
                        propertyid,
                        filename,
                        fileindex,
                        storagekey,
                        storagebucket,
                        createddate
                    )
                    values (
                        @PropertyId,
                        @FileName,
                        @FileIndex,
                        @StorageKey,
                        @StorageBucket,
                        @CreatedDate
                    );";

                    conn.Execute(sql2, 
                        new {
                            PropertyId = file.PropertyId,
                            FileName = file.FileName,
                            FileIndex = file.FileIndex,
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
