import { Director } from "./director.interface";

export interface Movie {
    idMovie: number;
    name: string;
    releaseYear: string;
    gender: string;
    duration: string;
    fkIdDirector: number;
    fkIdDirectorNavigation?: Director; 
}