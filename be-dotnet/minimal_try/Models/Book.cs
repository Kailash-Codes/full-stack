using System.ComponentModel.DataAnnotations;

namespace minimal_try.Models
{
    public class Book
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Author { get; set; }

        public long Price { get; set; }

    }
}
