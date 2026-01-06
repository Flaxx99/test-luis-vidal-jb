import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';
import { Director } from '../interfaces/director.interface';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root',
})
export class Api {
  private http = inject(HttpClient);

  //puerto .net
  private apiUrl = environment.apiUrl;

  constructor() { }

  //MOVIES
  
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/Movies`);
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/Movies/${id}`);
  }

  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/Movies`, movie);
  }

  updateMovie(id: number, movie: Movie): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Movies/${id}`, movie);
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Movies/${id}`);
  }

 
  //DIRECTORS

  getDirectors(): Observable<Director[]> {
    return this.http.get<Director[]>(`${this.apiUrl}/Directors`);
  }

  getDirectorById(id: number): Observable<Director> {
    return this.http.get<Director>(`${this.apiUrl}/Directors/${id}`);
  }

  createDirector(director: Director): Observable<Director> {
    return this.http.post<Director>(`${this.apiUrl}/Directors`, director);
  }

  updateDirector(id: number, director: Director): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Directors/${id}`, director);
  }

  deleteDirector(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Directors/${id}`);
  }
  
}
