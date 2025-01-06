import { AuthService } from './../service/auth.service';
import { inject } from '@angular/core';
import { HttpStatusCode, type HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getCurrentUserValue();
  if (!user || !user.access_token) {
    // informo que não é possivel enviar o token
    console.log("não enviou o token");
    return next(req);
  }

  const modified = req.clone({
    setHeaders: {
      Authorization: `${user.token_type} ${user.access_token}`,
    },
  });
  return next(modified).pipe(
    catchError((error)=>{
      if(error.status === HttpStatusCode.Unauthorized)
        router.navigate(['user', 'login'])

      return throwError(() => error);
    })
  )
};
