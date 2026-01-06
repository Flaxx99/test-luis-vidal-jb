using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CinemaAPI.Models;

public partial class CinemaDbContext : DbContext
{
    public CinemaDbContext()
    {
    }

    public CinemaDbContext(DbContextOptions<CinemaDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Director> Directors { get; set; }

    public virtual DbSet<Movie> Movies { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-8OPI64R;Database=CinemaDB;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Director>(entity =>
        {
            entity.HasKey(e => e.IdDirector).HasName("PK__director__6B65E2A25FFA235B");

            entity.ToTable("director");

            entity.Property(e => e.IdDirector).HasColumnName("id_director");
            entity.Property(e => e.Age).HasColumnName("age");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.Name)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Nationality)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nationality");
        });

        modelBuilder.Entity<Movie>(entity =>
        {
            entity.HasKey(e => e.IdMovie).HasName("PK__movies__FB90FCD7AC8F9A4D");

            entity.ToTable("movies");

            entity.Property(e => e.IdMovie).HasColumnName("id_movie");
            entity.Property(e => e.Duration).HasColumnName("duration");
            entity.Property(e => e.FkIdDirector).HasColumnName("FK_id_director");
            entity.Property(e => e.Gender)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("gender");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.ReleaseYear).HasColumnName("release_year");

            entity.HasOne(d => d.FkIdDirectorNavigation).WithMany(p => p.Movies)
                .HasForeignKey(d => d.FkIdDirector)
                .HasConstraintName("FK__movies__FK_id_di__398D8EEE");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
