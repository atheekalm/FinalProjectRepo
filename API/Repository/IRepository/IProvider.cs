using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Helpers;

namespace API.Repository.IRepository
{
    public interface IProvider
    {
        Task<ServiceProvider> GetServiceProviderByIdAsync(int Id);
        Task<ServiceProvider> IfserviceExistReturnUser(int id);
        Task<ServiceProvider> GetServiceProviderByUsernameAsync(string username);
        Task<IEnumerable<ServiceProvider>> GetServiceProvidersAsync();
        void Update(ServiceProvider serviceProvider);
        Task<bool> SaveAllAsync();
        Task<ServiceProviderDto> GetSProviderAsync(int id);
        Task<ServiceProviderDto> GetSProviderAsync(string username);
        Task<PageList<ServiceProviderDto>> GetSProvidersAsync(UserParams userParams);
        void RemoveProfile(ServiceProvider ServiceProvider);
        Task CreateProfile(ServiceProvider provider);
    }
}