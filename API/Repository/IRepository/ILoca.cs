using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Trach.Repository.IRepository
{
    public interface ILoca
    {
        Task<string> GetCity(int id);
        Task<string> GetDist(int id);

    }
}