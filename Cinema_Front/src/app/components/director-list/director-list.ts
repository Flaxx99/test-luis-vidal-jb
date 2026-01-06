import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Api } from '../../services/api';
import { Director } from '../../interfaces/director.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-director-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './director-list.html',
  styleUrl: './director-list.css'
})
export class DirectorList implements OnInit {

  private api = inject(Api);
  
  directors = signal<Director[]>([]);

  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadDirectors();
  }

  loadDirectors() {
    this.api.getDirectors().subscribe({
      next: (data) => {
        this.directors.set(data);
        this.isLoading.set(false);
      },
      error: (e) => {console.error(e)
        this.isLoading.set(false);
      }
    });
  }

  deleteDirector(id: number) {
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
        this.api.deleteDirector(id).subscribe(() => {
          
          Swal.fire(
            'Deleted!',
            'The director has been deleted.',
            'success'
          );

          this.loadDirectors();
        });
      }
    });
  }
}