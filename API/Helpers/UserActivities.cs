using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using API.Extension;
using API.Repository.IRepository;

namespace API.Helpers
{
    public class UserActivities : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var result = await next();
            if(!result.HttpContext.User.Identity.IsAuthenticated) return;
            // var loggedservice = result.HttpContext.User.GetUserId();
            // var reposervice = result.HttpContext.RequestServices.GetService<IProvider>();
            
            // var getservice = await reposervice.IfserviceExistReturnUser(loggedservice);
            // if(getservice!=null)
            //     getservice.LastActive =DateTime.Now;
            // await reposervice.SaveAllAsync();
        }
    }
}