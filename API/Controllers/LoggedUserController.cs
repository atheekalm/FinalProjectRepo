using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Controllers;
using API.Data;
using API.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class LoggedUserController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IloggedappUser _user;
        public LoggedUserController(DataContext context, IloggedappUser user)
        {
            _user = user;
            _context = context;

        }

        [HttpGet("CheckProfileExist/{id}")]
        public async Task<ActionResult<bool>> Profile(int id)
        {
            var result = await _user.IfserviceExist(id);
            return Ok(!result);
        }
    }
}