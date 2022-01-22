using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Entities;
using API.Repository.IRepository;
using System.Linq;

namespace API.Repository
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
        public async Task<bool> IfserviceExist(int Userid)
        {
            return await _context.ServiceProviders.Where(x => x.AppUserId == Userid).AnyAsync();
        }
    }
}
