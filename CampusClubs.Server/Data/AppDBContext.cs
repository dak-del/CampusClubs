using Microsoft.EntityFrameworkCore;
using CampusClubs.Server.Models;

namespace CampusClubs.Server.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Club> Clubs { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<ApplicationAnswer> ApplicationAnswers { get; set; }
        public DbSet<ApplicationHistory> ApplicationHistories { get; set; }
        public DbSet<ClubMember> ClubMembers { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Club>().HasData(
                new Club { ID = 1, Name = "Союз студентов", Description = "Профсоюз студентов УрФУ.", Direction = "Профсоюз", ContactInfo = "+7 (343) 375-45-18" },
                new Club { ID = 2, Name = "Клуб Егоров", Description = "Клуб людей с именем Егор.", Direction = "Хобби", ContactInfo = "eeegorov@urfu.me" }
                );
            modelBuilder.Entity<User>().HasData(
                new User { ID = 1, FullName = "Иванов Иван Иванович", Email = "iiivanov@urfu.me" }
                );
        }
    }
}
    
  
