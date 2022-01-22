using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using API.Entities;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync(@"Data\userSeedData.json");
            var providerData = await System.IO.File.ReadAllTextAsync(@"Data\SProviderSeedData.json");
            var location = await System.IO.File.ReadAllTextAsync(@"Data\discity.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            var sdata = JsonSerializer.Deserialize<List<ServiceProvider>>(providerData);
            var loca = JsonSerializer.Deserialize<List<District>>(location);
            if (users == null) return;

            var roles = new List<AppRole>{
                new AppRole{Name = "ServiceProvider"},
                new AppRole{Name = "ServiceConsumer"},
                new AppRole{Name = "Admin"}
            };
            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }
            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "Atheek@456");
                await userManager.AddToRoleAsync(user, "ServiceProvider");
            }
            foreach (var provider in sdata)
            {
                await context.ServiceProviders.AddAsync(provider);
            }
            foreach (var dist in loca)
            {
                await context.Districts.AddAsync(dist);
            }
            var admin = new AppUser
            {
                UserName = "admin",
                Email = "admin@gmail.com"
            };
            await userManager.CreateAsync(admin, "Atheek@456");
            await userManager.AddToRolesAsync(admin, new[] { "ServiceProvider", "Admin" });

        }
        //         public static async Task SeedfUser(DataContext context)
        // {
        //     if(await context.AppUsers.AnyAsync())return;
        //     var userData = await System.IO.File.ReadAllTextAsync(@"Data\userSeedData.json");
        //     var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
        //     foreach (var user in users)
        //     {
        //         context.AppUsers.Add(user);
        //     }
        //     await context.SaveChangesAsync();
        // }
    }
}