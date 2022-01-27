using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Repository.IRepository;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class CategoryService : Icategory
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CategoryService(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        public async Task<IEnumerable<Category>> ListAllCategory()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<IEnumerable<SubCategory>> ListAllSubCategory()
        {
            return await _context.SubCategories.ToListAsync();
        }

        public async Task<IEnumerable<SubCategory>> ListAllSubCategoryByCategory(int CategoryId)
        {
            return await _context.SubCategories.Where(x => x.CategoryId == CategoryId).ToListAsync();
        }
    }
}