using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Repository.IRepository;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Entities;

namespace API.Repository
{
    public class LocationService : Ilocation
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public LocationService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }
        public async Task<IEnumerable<City>> ListAllCities()
        {
            return await _context.Cities
            .Include(x => x.District)
            .ToListAsync();
        }

        public async Task<IEnumerable<City>> ListAllCitiesByDistrict(int districtId)
        {
            return await _context.Cities.Where(x => x.DistrictId == districtId).ToListAsync();
        }

        public async Task<IEnumerable<District>> ListAllDistricts()
        {
            return await _context.Districts.ToListAsync();
        }

    }
}