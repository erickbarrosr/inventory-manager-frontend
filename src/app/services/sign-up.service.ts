import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  register({ formData }: { formData: Record<string, any> }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sign-up`, formData).pipe(
      catchError((error) => {
        const errorMessage =
          error.error?.message ??
          'Erro no cadastro. Por favor, tente novamente.';
        console.error('Erro no cadastro:', errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
