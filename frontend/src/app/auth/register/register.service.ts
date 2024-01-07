import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(
    private httpClient: HttpClient
  ) { }

  register(body: any) {
    return this.httpClient.post(`${environment.URL_BACKEND}/auth/register`, body);
  }
}

