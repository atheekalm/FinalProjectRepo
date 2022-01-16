using System;
using System.Collections.Generic;

namespace Trach.DTO
{
    public class ServiceProviderDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LasttName { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public int Age { get; set; }
        public string Nic { get; set; }
        public string photoUrl { get; set; }
        public string About { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool Status { get; set; }
        public string Education { get; set; }
        public string Skills { get; set; }
        public string WorkSummery { get; set; }
        public double SalaryHourly { get; set; }
        public string WorkAs { get; set; }
        public DateTime Created { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
    }
}