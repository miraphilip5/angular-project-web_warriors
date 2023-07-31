import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flower } from '../../models/flower';
import { environment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  saveToCart(flower: Flower, qty: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });
    return this.http.post(`${environment.serverUrl}/api/carts`,
      {
        f_id: flower.f_id,
        quantity: qty,
        name: flower.name,
        price: flower.price
      },
      {
        headers,
      }
    );
  }
}
