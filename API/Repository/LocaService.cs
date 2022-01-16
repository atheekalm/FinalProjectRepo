using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Trach.Data;
using Trach.Repository.IRepository;

namespace Trach.Repository
{
    public class LocaService : ILoca
    {
        private readonly DataContext _context;
        public LocaService(DataContext context)
        {
            _context = context;

        }
        public async Task<string> GetCity(int id)
        {
            var city = await _context.Cities.FirstOrDefaultAsync(c => c.Id == id);
            return city.CitytName;
        }

        public async Task<string> GetDist(int id)
        {
            var distr = await _context.Districts.FirstOrDefaultAsync(c => c.Id == id);
            return distr.DistrictName;
        }
    }
}