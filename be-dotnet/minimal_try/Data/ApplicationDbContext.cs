using Microsoft.EntityFrameworkCore;
using minimal_try.Models;

namespace minimal_try.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Book> Books { get; set; }
    }
}
