using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Repository.IRepository
{
    public interface Icategory
    {
         Task<IEnumerable<Category>> ListAllCategory();
        Task<IEnumerable<SubCategory>> ListAllSubCategoryByCategory(int CategoryId);
        Task<IEnumerable<SubCategory>> ListAllSubCategory();
    }
}