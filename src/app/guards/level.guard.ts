import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const levelGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const targetId = Number(route.paramMap.get('id'));
  const currentLevel = Number(localStorage.getItem('activeLevel') || '1');
  if (targetId === currentLevel) {
    return true;
  } else {
    return router.parseUrl(`/gamePlay/${currentLevel}`);
  }
};
