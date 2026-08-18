import { Component, inject, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ApiError2 } from '../../types/Error';
import { Router } from '@angular/router';

@Component({
  selector: 'app-errorpage',
  imports: [],
  templateUrl: './errorpage.html',
  styleUrl: './errorpage.css',
})
export class Errorpage {
  protected error: ApiError2;
  private location= inject(Location);
  private router=inject(Router);

  constructor(){
    const navigation = this.router.currentNavigation();
    this.error = navigation?.extras?.state?.['error'];
    //console.log("logging123 code"+this.error);
  }

  goBack(){
    this.location.back();
  }
}
