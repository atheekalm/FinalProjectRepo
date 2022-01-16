using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Trach.Data;
using Trach.Entities;
using Trach.Repository.IRepository;

namespace Trach.Repository
{
    public class AppuserService : IloggedappUser
    {
        private readonly DataContext _context;
        public AppuserService(DataContext context)
        {
            _context = context;

        }
        public async Task<AppUser> GetAppUserByUserName(string username)
        {
            return await _context.AppUsers.FirstOrDefaultAsync(u => u.UserName == username);
        }

        public async Task<AppUser> GetAppUserByIdAsync(int Id)
        {
            return await _context.AppUsers.FirstOrDefaultAsync(u => u.Id == Id);
        }
    }
}