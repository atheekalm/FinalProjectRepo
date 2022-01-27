using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Repository.IRepository;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CategoryController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly Icategory _category;
        private readonly IMapper _mapper;
        public CategoryController(DataContext context, Icategory category, IMapper mapper)
        {
            _mapper = mapper;
            _category = category;
            _context = context;

        }


        [AllowAnonymous]
        [HttpGet("Category")]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> ListAllDistricts()
        {
            var Category = await _category.ListAllCategory();
            var result = _mapper.Map<IEnumerable<CategoryDto>>(Category);
            return Ok(result);
        }
        [AllowAnonymous]
        [HttpGet("SubCategory")]
        public async Task<ActionResult<IEnumerable<SubCategoryDto>>> ListAllCities()
        {
            var SubCategory = await _category.ListAllSubCategory();
            var result = _mapper.Map<IEnumerable<SubCategoryDto>>(SubCategory);
            return Ok(result);
        }

    }
}