import { CanActivateFn, Router } from '@angular/router';
import { Inject, inject } from '@angular/core';
import { LocalstorageService } from './localstorage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = Inject(Router); 
  const localStorage = inject(LocalstorageService);
  
  if (localStorage.getItem('accessToken')) {
    return true;
  } else {
    
    router.navigate(['/login']);
    return false;
  }
};
