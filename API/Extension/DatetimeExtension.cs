using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Trach.Entities;
using Trach.Repository.IRepository;

namespace Trach.Extension
{
    public static class DatetimeExtension
    {
        public static int CalculateAge(this DateTime DOB)
        {
            var today = DateTime.Today;
            var Age = today.Year - DOB.Year;
            if (DOB.Date > today.AddYears(-Age)) Age--;
            return Age;
        }

        
        // public static string mapcity(this int id)
        // {

        // }
    }
}
