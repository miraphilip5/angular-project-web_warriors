import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flower } from '../../models/flower';
import { environment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class FlowerService {
  constructor(private http: HttpClient) { }

  getFlowers(): Observable<Flower[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });

    return this.http.get<Flower[]>(
      `${environment.serverUrl}/api/flowers`,
      {
        headers,
      }
    );
  }

  getLoginUserData(): Observable<{ name: string }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });

    return this.http.get<{ name: string }>(
      `${environment.serverUrl}/api/auth`,
      {
        headers,
      }
    );
  }

  getFlowerById(f_id: number): Observable<Flower> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });
    return this.http.get<Flower>(`${environment.serverUrl}/api/flowers/${f_id}`,
      {
        headers,
      }
    );
  }


}
