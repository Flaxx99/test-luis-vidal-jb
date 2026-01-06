import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

import { Api } from '../../services/api';
import { Director } from '../../interfaces/director.interface';
import { Movie } from '../../interfaces/movie.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink], 
  templateUrl: './movie-form.html',
  styleUrl: './movie-form.css'
})
export class MovieForm implements OnInit {
  
  private fb = inject(FormBuilder);
  private api = inject(Api);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form: FormGroup;
  directors = signal<Director[]>([]);
  isEditMode = false;
  movieId?: number;

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      releaseYear: ['', Validators.required],
      gender: ['', Validators.required],
      fkIdDirector: ['', Validators.required],
      hours: [0, [Validators.required, Validators.min(0)]],
      minutes: [0, [Validators.required, Validators.min(0), Validators.max(59)]]
    });
  }

  ngOnInit(): void {
    this.api.getDirectors().subscribe(data => {
      this.directors.set(data);
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.movieId = params['id'];
        this.loadMovieData(this.movieId!);
      }
    });
  }

  loadMovieData(id: number) {
    this.api.getMovieById(id).subscribe(movie => {
      const timeParts = movie.duration.split(':');
      const h = parseInt(timeParts[0]);
      const m = parseInt(timeParts[1]);

      this.form.patchValue({
        name: movie.name,
        releaseYear: movie.releaseYear.split('T')[0], 
        gender: movie.gender,
        fkIdDirector: movie.fkIdDirector,
        hours: h,
        minutes: m
      });
    });
  }

  save() {
    if (this.form.invalid) return;

    const formValues = this.form.value;

    const strHours = formValues.hours.toString().padStart(2, '0');
    const strMinutes = formValues.minutes.toString().padStart(2, '0');

    const movieData: Movie = {
      idMovie: this.isEditMode ? this.movieId! : 0,
      name: formValues.name,
      gender: formValues.gender,
      releaseYear: formValues.releaseYear,
      fkIdDirector: formValues.fkIdDirector,
      duration: `${strHours}:${strMinutes}:00`
    };

    if (this.isEditMode && this.movieId) {
      this.api.updateMovie(this.movieId, movieData).subscribe(() => {
        
        Swal.fire({
          title: 'Updated!',
          text: 'Movie updated successfully',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3085d6'
        }).then(() => {
          this.router.navigate(['/']);
        });

      });
    } else {
      this.api.createMovie(movieData).subscribe(() => {
        
        Swal.fire({
          title: 'Created!',
          text: 'New movie added successfully',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3085d6'
        }).then(() => {
          this.router.navigate(['/']);
        });

      });
    }
}
}