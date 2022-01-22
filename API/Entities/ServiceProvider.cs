using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using API.Helpers;

namespace API.Entities
{
    public class ServiceProvider
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LasttName { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public DateTime Age { get; set; }
        public string Nic { get; set; }
        public string About { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool Status { get; set; }
        public string Education { get; set; }
        public string Skills { get; set; }
        public string WorkSummery { get; set; }
        public double SalaryHourly { get; set; }
        public string WorkAs { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public int DistrictId { get; set; }
        public District District { get; set; }
        public int CityId { get; set; }
        public City City { get; set; }
        public Category Category { get; set; }
        
        // public SubCategory SubCategory { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}