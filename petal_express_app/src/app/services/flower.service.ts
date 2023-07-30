import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flower } from '../models/flower';
import { environment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class FlowerService {
  private url: string = `${environment.serverUrl}/api/flowers`
  constructor(private http: HttpClient) { }

  getFlowers(): Observable<Flower[]> {
    return this.http.get<Flower[]>(this.url);
  }
}
