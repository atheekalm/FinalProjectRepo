using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Trach.Entities;

namespace Trach.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, int,
        IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<ServiceProvider> ServiceProviders { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
                .HasOne(s => s.ServiceProvider)
                .WithOne(sr => sr.AppUser)
                .HasForeignKey<ServiceProvider>(s => s.AppUserId)
                .IsRequired();

            builder.Entity<ServiceProvider>()
                .HasOne(s => s.City)
                .WithOne(sr => sr.ServiceProvider)
                .HasForeignKey<ServiceProvider>(s => s.CityId)
                .IsRequired();

            builder.Entity<ServiceProvider>()
                .HasOne(s => s.District)
                .WithOne(sr => sr.ServiceProvider)
                .HasForeignKey<ServiceProvider>(s => s.DistrictId)
                .IsRequired();

            builder.Entity<District>()
                .HasMany(c => c.City)
                .WithOne(d => d.District)
                .HasForeignKey(f => f.DistrictId)
                .IsRequired();

            builder.Entity<AppUser>()
                .HasMany(ur => ur.UserRole)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRole)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();

            builder.Entity<Message>()
                .HasOne(u => u.Recipient)
                .WithMany(m => m.MessagesRecieved)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                .HasOne(u => u.Sender)
                .WithMany(m => m.MessagesSend)
                .OnDelete(DeleteBehavior.Restrict);

        }

    }
}