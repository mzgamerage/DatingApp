import { HttpInterceptorFn } from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const router = inject(Router);
  
  return next(req).pipe(
    catchError((error) => {
      if (error) {
                switch (error.status) {
          case 400:
            if(error.error.errors){
              const modelStateErrors :string[]=errors(error);
            
              throw modelStateErrors.flat();
            }else{
              toast.error(`${error.status} ${error.error}`); 
              router.navigateByUrl('/errorpage', { state: { error: error.error } });
            }
            break;
          case 401:
            toast.error(`${error.status} Unauthorised`);
            router.navigateByUrl('/errorpage', { state: { error: error } });
            break;
          case 404:
            router.navigate(['/notfound']);
            break;
          case 500:
            const navigationExtras: NavigationExtras = { state: { error: error } };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
          
            //router.navigateByUrl('/errorpage', { state: { error: error.error } });
            break;
        }
      }
      throw error;
    }),
  );
};

  function errors(error: any): string[] {
              const modelStateErrors :string[]=[];
              for(const key in error.error.errors){
                if(error.error.errors[key]){
                  modelStateErrors.push(error.error.errors[key]);
                }
                
              }
              return modelStateErrors;
  }