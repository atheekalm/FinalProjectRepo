using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.DTO;
using API.Entities;
using API.Extension;
using API.Helpers;
using API.Repository.IRepository;

namespace API.Repository
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

        public async Task CreateProfile(ServiceProvider provider)
        {
            await _context.ServiceProviders.AddAsync(provider);
        }

        public Task<ServiceProvider> getProfie(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceProvider> GetServiceProviderByIdAsync(int Id)
        {
            return await _context.ServiceProviders
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.AppUserId == Id);

        }

        public async Task<ServiceProvider> GetServiceProviderByUsernameAsync(string username)
        {
            return await _context.ServiceProviders
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.AppUser.UserName == username);
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
            .Category(userParams.Category)
            .SubCategory(userParams.SubCategory)
            .TopServices()
            .AsQueryable();

            return await PageList<ServiceProviderDto>.CreateAsync(query.ProjectTo<ServiceProviderDto>(_mapper
                            .ConfigurationProvider).AsNoTracking(),
                                userParams.PageNumber, userParams.PageSize);
        }


        public async Task<ServiceProvider> IfserviceExistReturnUser(int Userid)
        {
            return await _context.ServiceProviders.Where(x => x.AppUserId == Userid).FirstOrDefaultAsync();
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