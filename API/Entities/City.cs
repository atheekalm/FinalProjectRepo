using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Trach.Entities
{
    public class City
    {
        [Key]
        public int Id { get; set; }
        public string CitytName { get; set; }
        public District District { get; set; }
        public int DistrictId { get; set; }
        public ServiceProvider ServiceProvider { get; set; }
    }
}