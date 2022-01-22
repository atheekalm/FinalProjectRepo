using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class District
    {
        [Key]
        public int Id { get; set; }
        public string DistrictName { get; set; }
        public ICollection<City> City { get; set; }
        public ServiceProvider ServiceProvider { get; set; }

    }
}