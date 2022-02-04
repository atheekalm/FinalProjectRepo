using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.DTO;
using API.Entities;
using API.Extension;
using API.Helpers;
using API.Repository.IRepository;


namespace API.Controllers
{
    [Authorize]
    public class ServiceController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IProvider _ServiceProvider;
        private readonly IMapper _mapper;
        public IPhoto Photo { get; }
        private readonly IPhoto _photo;
        private readonly IloggedappUser _LoggedAppUser;
        public ServiceController(DataContext context, IProvider ServiceProvider, IMapper mapper, IPhoto photo, IloggedappUser loggedAppUser)
        {
            _LoggedAppUser = loggedAppUser;
            _photo = photo;
            _mapper = mapper;
            _ServiceProvider = ServiceProvider;
            _context = context;
        }


        [HttpPost("CreateProfile")]
        public async Task<IActionResult> CreateProfile(ServiceProviderCreateProfileDtos profileDtos)
        {
            var UserName = User.GetUserName();
            var Owner = await _LoggedAppUser.GetAppUserByUserName(UserName);
            var userExit = await _LoggedAppUser.IfserviceExist(Owner.Id);
            if(userExit) return BadRequest("Already Profile Exits");
            var profile = _mapper.Map<ServiceProvider>(profileDtos);
            profile.AppUserId = Owner.Id;
            await _ServiceProvider.CreateProfile(profile);
            await _ServiceProvider.SaveAllAsync();
            return Ok("Success...");

        }


        [HttpGet("{id}", Name = "GetUser")]
        public async Task<ActionResult<ServiceProvider>> GetService(int id)
        {
            var SProvider = await _ServiceProvider.GetSProviderAsync(id);
            return Ok(SProvider);
        }


        [AllowAnonymous]
        [HttpGet("Services")]
        public async Task<ActionResult<IEnumerable<ServiceProviderDto>>> GetServices([FromQuery] UserParams userParams)
        {
            var services = await _ServiceProvider.GetSProvidersAsync(userParams);
            Response.AddPaginationHeader(services.CurrentPage, services.PageSize, services.TotalCount, services.TotalPages);
            return Ok(services);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateService(ServiceUpdateDto serviceUpdateDto)
        {
            var selectedservice = await _ServiceProvider.IfserviceExistReturnUser(User.GetUserId());
            _mapper.Map(serviceUpdateDto, selectedservice);
            _ServiceProvider.Update(selectedservice);
            if (await _ServiceProvider.SaveAllAsync()) return NoContent();
            return BadRequest();
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto([FromForm] IFormFile file)
        {
            var id = User.GetUserId();
            var service = await _ServiceProvider.GetServiceProviderByIdAsync(User.GetUserId());
            var result = await _photo.AddPhotoAsync(file);
            if (result.Error != null) return BadRequest(result.Error.Message);
            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };
            if (service.Photos.Count == 0)
            {
                photo.IsMain = true;
            }
            service.Photos.Add(photo);
            if (await _ServiceProvider.SaveAllAsync())
            {
                return CreatedAtRoute("GetUser", new { id = service.Id }, _mapper.Map<PhotoDto>(photo));
            }
            return BadRequest("Problem Adding Photos");
        }
        

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetmainPhoto(int photoId)
        {
            var service = await _ServiceProvider.GetServiceProviderByUsernameAsync(User.GetUserName());
            var photo = service.Photos.FirstOrDefault(p => p.Id == photoId);
            if (photo.IsMain) return BadRequest("This is Your Main Photo");
            var currentmain = service.Photos.FirstOrDefault(m => m.IsMain);
            if (currentmain != null) currentmain.IsMain = false;
            photo.IsMain = true;
            if (await _ServiceProvider.SaveAllAsync()) return NoContent();
            return BadRequest("Faild to set main photo");
        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var service = await _ServiceProvider.GetServiceProviderByUsernameAsync(User.GetUserName());
            var photo = service.Photos.FirstOrDefault(p => p.Id == photoId);
            if (photo == null) return NotFound();
            if (photo.IsMain) return BadRequest("You cannot delete main photo");
            if (photo.PublicId != null)
            {
                var result = await _photo.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }
            service.Photos.Remove(photo);
            if (await _ServiceProvider.SaveAllAsync()) return Ok();
            return BadRequest("Faild to delete photo");
        }
    }
}
