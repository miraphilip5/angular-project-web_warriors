import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
// Import Angular Material components
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { environment } from '../../../enviroments/enviroments';

interface FlowerItem {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  f_id: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ MatButtonModule, 
    MatIconModule, 
    MatTableModule, 
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  flowerItems: FlowerItem[] = [];
  snackbarOpen = false;
  private serverUrl = environment.serverUrl;
  searchForm = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBarModule
  ) {}

  ngOnInit() {
    this.fetchFlowers();
  }

  handleSearch() {
    const searchTerm = this.searchForm.get('search')?.value?.trim()?.toLowerCase() || '';
    if (searchTerm) {
      this.flowerItems = this.flowerItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
    } else {
      // If the search term is empty, reset the list to the original full list of items
      this.fetchFlowers();
    }
  }

  fetchFlowers() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token || '');

    this.http
      .get<FlowerItem[]>(
        `${this.serverUrl}/api/carts`,
        { headers }
      )
      .subscribe(
        (response) => {
          this.flowerItems = response;
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
  }

  handleDelete(id: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token || '');

    this.http
      .delete(`${this.serverUrl}/api/carts/${id}`, { headers })
      .subscribe(
        () => {
          this.flowerItems = this.flowerItems.filter((item) => item.f_id !== id);
        },
        (error) => {
          console.error('Error deleting item:', error);
        }
      );
  }

  handleIncreaseQuantity(id: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token || '');

    this.http
      .put(
        `${this.serverUrl}/api/carts/${id}/increase`,
        { operation: 'increase' },
        { headers }
      )
      .subscribe(
        () => {
          this.flowerItems = this.flowerItems.map((item) => {
            if (item.f_id === id) {
              return {
                ...item,
                quantity: item.quantity + 1
              };
            }
            return item;
          });
        },
        (error) => {
          console.error('Error increasing quantity:', error);
        }
      );
  }

  handleReduceQuantity(id: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token || '');

    this.http
      .put(
        `${this.serverUrl}/api/carts/${id}/reduce`,
        { operation: 'reduce' },
        { headers }
      )
      .subscribe(
        () => {
          this.flowerItems = this.flowerItems.map((item) => {
            if (item.f_id === id) {
              const updatedCount = item.quantity - 1;
              if (updatedCount >= 0) {
                return {
                  ...item,
                  quantity: updatedCount
                };
              }
            }
            return item;
          }).filter((item) => item.quantity !== 0);
        },
        (error) => {
          console.error('Error reducing quantity:', error);
        }
      );
  }

  calculateTotalPrice() {
    let totalPrice = 0;
    this.flowerItems.forEach((item) => {
      totalPrice += item.quantity * item.price;
    });
    return totalPrice.toFixed(2);
  }

  handlePlaceOrder() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token || '');

    const flowers = this.flowerItems.map((item) => ({
      id: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    this.http
      .post(
        `${this.serverUrl}/api/orders`,
        { flowers },
        { headers }
      )
      .subscribe(
        () => {
          this.emptyCart();
        },
        (error) => {
          console.error('Error placing order:', error);
        }
      );
  }

  emptyCart() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token || '');

    this.http
      .delete(`${this.serverUrl}/api/carts`, { headers })
      .subscribe(
        () => {
          this.snackbarOpen = true;
          this.flowerItems = [];
          this.router.navigate(['/orders']);
        },
        (error) => {
          console.error('Error emptying cart:', error);
        }
      );
  }
}
