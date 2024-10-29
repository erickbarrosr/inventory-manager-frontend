import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private apiUrl = 'https://api.example.com/register'; // URL da API de registro

  constructor(private http: HttpClient) {}

  register(formData: any): Observable<any> {
    // Envia uma requisição POST com os dados do formulário
    return this.http.post<any>(this.apiUrl, formData);
  }
}
