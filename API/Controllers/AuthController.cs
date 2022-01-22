using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Controllers;
using API.DTO;
using API.Entities;
using API.IRepository;

namespace API.DotNet_Identitty.Controllers
{
    public class AuthController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        public AuthController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
        }
        [HttpPost("Login")]
        public async Task<ActionResult<AppuserReturnDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (user == null) return Unauthorized("Invalid username");
            var result = await _signInManager
                         .CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) return Unauthorized();

            return new AppuserReturnDto
            {
                Id = user.Id,
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                PhotoUlr = user.AppUserPhoto?.Url
            };
        }
        [HttpPost("Register")]
        public async Task<ActionResult<AppuserReturnDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");

            var user = _mapper.Map<AppUser>(registerDto);
            user.UserName = registerDto.Username.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "ServiceProvider");
            if (!roleResult.Succeeded) return BadRequest(result.Errors);
            return new AppuserReturnDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user)
            };
        }

        private Task<bool> UserExists(string username)
        {
            return _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }

        [Authorize]
        [HttpGet("CurrentUser")]
        public async Task<ActionResult<AppuserReturnDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);


            return new AppuserReturnDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                PhotoUlr = user.AppUserPhoto?.Url
            };
        }
    }
}