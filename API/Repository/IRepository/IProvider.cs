using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Trach.DTO;
using Trach.Entities;
using Trach.Helpers;

namespace Trach.Repository.IRepository
{
    public interface IProvider
    {
        Task<ServiceProvider> GetServiceProviderByIdAsync(int Id);
        Task<bool> IfserviceExist(int id);
        Task<ServiceProvider> IfserviceExistReturnUser(int id);
        Task<ServiceProvider> GetServiceProviderByUsernameAsync(string username);
        Task<IEnumerable<ServiceProvider>> GetServiceProvidersAsync();
        void Update(ServiceProvider serviceProvider);
        Task<bool> SaveAllAsync();
        Task<ServiceProviderDto> GetSProviderAsync(int id);
        Task<ServiceProviderDto> GetSProviderAsync(string username);
        Task<PageList<ServiceProviderDto>> GetSProvidersAsync(UserParams userParams);
        void RemoveProfile(ServiceProvider ServiceProvider);
        Task<IEnumerable<District>> ListAllDistricts();
        Task<IEnumerable<City>> ListAllCitiesByDistrict(int districtId);
        Task<IEnumerable<City>> ListAllCities();
    }
}