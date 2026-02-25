import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwtToken'); // or your authService getter

  // Don’t attach token if missing (or for public endpoints)
  if (!token) return next(req);
  if (req.url.includes('/public/')) return next(req);
  
  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });

  return next(authReq);
};
