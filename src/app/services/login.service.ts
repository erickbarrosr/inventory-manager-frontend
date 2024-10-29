import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'https://api.example.com/login'; // URL da API de login

  constructor(private http: HttpClient) {}

  login(formData: any): Observable<any> {
    // Envia uma requisição POST com os dados do formulário
    return this.http.post<any>(this.apiUrl, formData);
  }
}
