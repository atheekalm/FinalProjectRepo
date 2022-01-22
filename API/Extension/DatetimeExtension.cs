using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Repository.IRepository;

namespace API.Extension
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
