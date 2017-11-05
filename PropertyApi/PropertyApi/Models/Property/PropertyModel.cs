using Dapper;
using Newtonsoft.Json;
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
        [JsonIgnore]
        public string Landlord { get; set; }

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
                    landlord
                ) 
                values (
                    @Address,
                    @City,
                    @State,
                    @Zipcode,
                    @Rent,
                    @Landlord
                ) returning id;";

                var result = conn.ExecuteScalar<int>(sql, property);
                return new { id = result };
            }
        }
    }
}
