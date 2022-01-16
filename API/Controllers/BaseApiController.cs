using Microsoft.AspNetCore.Mvc;
using Trach.Helpers;

namespace Trach.Controllers
{
    [ServiceFilter(typeof(UserActivities))]
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {

    }
}