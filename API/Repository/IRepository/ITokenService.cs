using System.Threading.Tasks;
using API.Entities;

namespace API.IRepository
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser appUser);
    }
}