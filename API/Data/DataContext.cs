using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using API.Entities;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, int,
        IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<ServiceProvider> ServiceProviders { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Invitation> Invitations { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<SubCategory> SubCategories { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
                .HasOne(s => s.ServiceProvider)
                .WithOne(sr => sr.AppUser)
                .HasForeignKey<ServiceProvider>(s => s.AppUserId)
                .IsRequired();

            builder.Entity<District>()
                .HasMany(c => c.City)
                .WithOne(d => d.District)
                .HasForeignKey(f => f.DistrictId)
                .IsRequired();

            builder.Entity<ServiceProvider>()
                .HasOne(d => d.District)
                .WithMany()
                .HasForeignKey(d => d.DistrictId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<ServiceProvider>()
                .HasOne(c => c.City)
                .WithMany()
                .HasForeignKey(c => c.CityId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<ServiceProvider>()
                .HasOne(c => c.Category)
                .WithMany()
                .HasForeignKey(c => c.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<ServiceProvider>()
                .HasOne(s => s.SubCategory)
                .WithMany()
                .HasForeignKey(s => s.SubCategoryId)
                .OnDelete(DeleteBehavior.Restrict);

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

            builder.Entity<Invitation>()
                .HasOne(p => p.Recipient)
                .WithMany(u => u.InvitationSender)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Invitation>()
                .HasOne(p => p.Sender)
                .WithMany(u => u.InvitationReciver)
                .OnDelete(DeleteBehavior.Restrict);

        }

    }
}