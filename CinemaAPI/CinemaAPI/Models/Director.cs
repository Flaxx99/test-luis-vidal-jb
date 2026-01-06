using System;
using System.Collections.Generic;

namespace CinemaAPI.Models;

public partial class Director
{
    public int IdDirector { get; set; }

    public string Name { get; set; } = null!;

    public string? Nationality { get; set; }

    public int? Age { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<Movie> Movies { get; set; } = new List<Movie>();
}
