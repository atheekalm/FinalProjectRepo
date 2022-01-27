using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class ServiceProviderCreateProfileDtos
    {
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
        public string Educations { get; set; }
        public string Skills { get; set; }
        public string WorkSummery { get; set; }
        public double SalaryHourly { get; set; }
        public string WorkAs { get; set; }
        public int AppUserId { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public int DistrictId { get; set; }
        public int CityId { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
    }
}