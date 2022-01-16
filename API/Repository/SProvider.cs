using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Trach.Data;
using Trach.DTO;
using Trach.Entities;
using Trach.Extension;
using Trach.Helpers;
using Trach.Repository.IRepository;

namespace Trach.Repository
{
    public class SProvider : IProvider
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public SProvider(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }
        public async Task<ServiceProvider> GetServiceProviderByIdAsync(int Id)
        {
            return await _context.ServiceProviders
                .Where(x => x.Id == Id)
                .ProjectTo<ServiceProvider>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<ServiceProvider> GetServiceProviderByUsernameAsync(string username)
        {
            return await _context.ServiceProviders
                .Where(x => x.AppUser.UserName == username)
                .ProjectTo<ServiceProvider>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<ServiceProvider>> GetServiceProvidersAsync()
        {
            return await _context.ServiceProviders.ToListAsync();
        }

        public async Task<ServiceProviderDto> GetSProviderAsync(int id)
        {
            return await _context.ServiceProviders
           .Where(x => x.Id == id)
           .ProjectTo<ServiceProviderDto>(_mapper.ConfigurationProvider)
           .SingleOrDefaultAsync();
        }

        public async Task<ServiceProviderDto> GetSProviderAsync(string username)
        {
            return await _context.ServiceProviders
            .Where(x => x.FirstName == username)
            .ProjectTo<ServiceProviderDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
        }

        public async Task<PageList<ServiceProviderDto>> GetSProvidersAsync(UserParams userParams)
        {
            var query = _context.ServiceProviders
            .Sort(userParams.OrderBy)
            .Gender(userParams.Gender)
            .CheckItsMe(userParams)
            .Search(userParams.SearchTearm)
            .District(userParams.District)
            .City(userParams.City)
            .AsQueryable();

            return await PageList<ServiceProviderDto>.CreateAsync(query.ProjectTo<ServiceProviderDto>(_mapper
                            .ConfigurationProvider).AsNoTracking(),
                                userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> IfserviceExist(int Userid)
        {
            return await _context.ServiceProviders.Where(x => x.Id == Userid).AnyAsync();
        }

        public async Task<ServiceProvider> IfserviceExistReturnUser(int Userid)
        {
            return await _context.ServiceProviders.Where(x => x.AppUserId == Userid).FirstOrDefaultAsync();
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

        public void RemoveProfile(ServiceProvider ServiceProvider)
        {
            _context.ServiceProviders.Remove(ServiceProvider);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(ServiceProvider serviceProvider)
        {
            _context.Entry(serviceProvider).State = EntityState.Modified;
        }
    }
}