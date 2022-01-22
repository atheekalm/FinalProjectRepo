using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Repository.IRepository
{
    public interface Ilocation
    {
        
        Task<IEnumerable<District>> ListAllDistricts();
        Task<IEnumerable<City>> ListAllCitiesByDistrict(int districtId);
        Task<IEnumerable<City>> ListAllCities();
    }
}