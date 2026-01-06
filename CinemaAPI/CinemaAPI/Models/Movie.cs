using System;
using System.Collections.Generic;

namespace CinemaAPI.Models;

public partial class Movie
{
    public int IdMovie { get; set; }

    public string Name { get; set; } = null!;

    public DateOnly? ReleaseYear { get; set; }

    public string? Gender { get; set; }

    public TimeOnly? Duration { get; set; }

    public int? FkIdDirector { get; set; }

    public virtual Director? FkIdDirectorNavigation { get; set; }
}
