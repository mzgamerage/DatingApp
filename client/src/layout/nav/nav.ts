import { Component, inject, signal } from '@angular/core';
import { AccountService } from '../../core/services/account-service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})

export class Nav {
  protected accountService = inject(AccountService);
  private router = inject(Router);
  private toast = inject(ToastService);
  protected creds: any = {};

  
  login(){
    this.accountService.login(this.creds).subscribe({
            next: (result: any) => {
                this.router.navigateByUrl('/members');
                console.log(result);
                this.toast.success('Login successful');
                this.creds = {};

            },
            error: error => {
                console.log(error.error);
                this.toast.error(error.error);
            }
        });
  }
  
  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/home');
                
  }
}
