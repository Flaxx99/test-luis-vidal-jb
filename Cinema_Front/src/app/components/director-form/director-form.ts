import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

import { Api } from '../../services/api';
import { Director } from '../../interfaces/director.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-director-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './director-form.html',
  styleUrl: './director-form.css'
})
export class DirectorForm implements OnInit {
  
  private fb = inject(FormBuilder);
  private api = inject(Api);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form: FormGroup;
  isEditMode = false;
  directorId?: number;

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      nationality: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(1)]],
      isActive: [true] // Default true
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.directorId = params['id'];
        this.loadDirectorData(this.directorId!);
      }
    });
  }

  loadDirectorData(id: number) {
    this.api.getDirectorById(id).subscribe(director => {
      this.form.patchValue({
        name: director.name,
        nationality: director.nationality,
        age: director.age,
        isActive: director.isActive
      });
    });
  }

  save() {
    if (this.form.invalid) return;

    const directorData: Director = {
      idDirector: this.isEditMode ? this.directorId! : 0,
      ...this.form.value
    };

    if (this.isEditMode && this.directorId) {
      this.api.updateDirector(this.directorId, directorData).subscribe(() => {
        
        Swal.fire({
          title: 'Updated!',
          text: 'Director updated successfully',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3085d6'
        }).then(() => {
          this.router.navigate(['/directors']);
        });

      });
    } else {
      this.api.createDirector(directorData).subscribe(() => {
        
        Swal.fire({
          title: 'Created!',
          text: 'New director added successfully',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3085d6'
        }).then(() => {
          this.router.navigate(['/directors']);
        });

      });
    }
  }
}