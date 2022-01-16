using System.Threading.Tasks;
using Trach.Entities;

namespace Trach.IRepository
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser appUser);
    }
}