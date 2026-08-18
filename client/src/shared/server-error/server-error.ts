import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiError2 } from '../../types/Error';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.html',
  styleUrl: './server-error.css',
})
export class ServerError {
  protected error: ApiError2;
  private router = inject(Router);
  protected showDetails = signal<boolean>(false);

  constructor() {
    const navigation = this.router.currentNavigation();
    this.error = navigation?.extras?.state?.['error'];
    //console.log("logging123 code"+this.error);
    
  }
 
  detailsToggle(){
    this.showDetails.set(!this.showDetails);
  }



}
