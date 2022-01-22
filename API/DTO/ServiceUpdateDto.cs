using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class ServiceUpdateDto
    {
        public string Address { get; set; }
        public string About { get; set; }
        public string Phone { get; set; }
        public bool Status { get; set; }
        public string Skills { get; set; }
        public string WorkSummery { get; set; }
        public double SalaryHourly { get; set; }
        public string WorkAs { get; set; }
    }
}