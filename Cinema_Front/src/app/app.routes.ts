import { Routes } from '@angular/router';
import { MovieList } from './components/movie-list/movie-list';
import { MovieForm } from './components/movie-form/movie-form';
import { DirectorList } from './components/director-list/director-list';
import { DirectorForm } from './components/director-form/director-form';


export const routes: Routes = [
    {path: '', component: MovieList},
    {path: 'create', component: MovieForm},
    {path: 'edit/:id', component: MovieForm},
    {path: 'directors', component: DirectorList },       
    {path: 'directors/create', component: DirectorForm },
    {path: 'directors/edit/:id', component: DirectorForm },

    {path: '**', redirectTo: '', pathMatch: 'full'}
];
