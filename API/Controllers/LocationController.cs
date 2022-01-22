using System.Collections.Generic;
using System.Threading.Tasks;
using API.Repository.IRepository;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.DTO;

namespace API.Controllers
{
    public class LocationController : BaseApiController
    {
        private readonly Ilocation _location;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public LocationController(DataContext context, Ilocation location, IMapper mapper)
        {
            _location = location;
            _mapper = mapper;
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet("Districts")]
        public async Task<ActionResult<IEnumerable<DistrictDto>>> ListAllDistricts()
        {
            var Districts = await _location.ListAllDistricts();
            var result = _mapper.Map<IEnumerable<DistrictDto>>(Districts);
            return Ok(result);
        }
        [AllowAnonymous]
        [HttpGet("Cities")]
        public async Task<ActionResult<IEnumerable<CityDto>>> ListAllCities()
        {
            var Cities = await _location.ListAllCities();
            var result = _mapper.Map<IEnumerable<CityDto>>(Cities);
            return Ok(result);
        }
        [AllowAnonymous]
        [HttpGet("District/{id}")]
        public async Task<ActionResult<IEnumerable<CityDto>>> ListAllCitiesById(int id)
        {
            var Cities = await _location.ListAllCitiesByDistrict(id);
            var result = _mapper.Map<IEnumerable<CityDto>>(Cities);
            return Ok(result);
        }
    }
}