using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Trach.Entities;

namespace Trach.Repository.IRepository
{
    public interface IloggedappUser
    {
        Task<AppUser> GetAppUserByUserName(string username);
        Task<AppUser> GetAppUserByIdAsync(int Id);
    }
}