using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Repository.IRepository
{
    public interface IloggedappUser
    {
        Task<AppUser> GetAppUserByUserName(string username);
        Task<AppUser> GetAppUserByIdAsync(int Id);
        Task<bool> IfserviceExist(int id);

    }
}