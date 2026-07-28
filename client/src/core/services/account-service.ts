import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal} from '@angular/core';
import { User } from '../../types/User';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
    providedIn: 'root',
})
export class AccountService {

     // Inject dependencies functionally
    private http = inject(HttpClient);
    private creds: any = {};

    currentUser = signal<User| null>(null);

    baseUrl = "https://localhost:5001/api/"
    //environment.apiUrl;
    login(creds: any) {

        return this.http.post<User>(this.baseUrl + 'account/login', creds).pipe(
            tap((user: User) => {
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.currentUser.set(user);
                }
            })
        );
    }

    register(creds: any) {
        return this.http.post<User>(this.baseUrl + 'account/register', creds).pipe(
            tap((user: User) => {
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.currentUser.set(user);
                }
            })
        );
    }
    
    logout() {
        localStorage.removeItem('user');
        this.currentUser.set(null);
    }
}


