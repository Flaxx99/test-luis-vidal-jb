import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Api } from '../../services/api';
import { Movie } from '../../interfaces/movie.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [RouterLink, DatePipe], 
  templateUrl: './movie-list.html', 
  styleUrl: './movie-list.css'
})
export class MovieList implements OnInit { 

  private api = inject(Api);
  movies = signal<Movie[]>([]);

  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.isLoading.set(true);

    this.api.getMovies().subscribe({
      next: (data) => {
        this.movies.set(data);
        this.isLoading.set(false);
      },
      error: (e) => {console.error(e)
        this.isLoading.set(false);
      }
    });
  }

  deleteMovie(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteMovie(id).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'The movie has been deleted.',
            'success'
          );
          this.loadMovies();
        });
      }
    });
  }
}