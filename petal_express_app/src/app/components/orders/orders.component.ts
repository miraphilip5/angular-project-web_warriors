import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { environment } from '../../../enviroments/enviroments';

interface Flower {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  orderId: string;
  flowers: Flower[];
  status: string;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  originalOrders: Order[] = [];
  // snackbarOpen = false;
  token: string | null = localStorage.getItem('token');
  search: string = ''; 
  private serverUrl = environment.serverUrl;

  constructor(private http: HttpClient, 
    // private snackBar: MatSnackBar
    ) {}

  ngOnInit() {
    this.fetchOrders();
  }

  handleSearch() {
    const searchTerm = this.search.trim().toLowerCase();
  
    if (searchTerm) {
      // Filter the orders based on the search term
      this.orders = this.originalOrders.filter((order) => {
        return order.flowers.some((flower) =>
          flower.name.toLowerCase().includes(searchTerm)
        );
      });
  
      // Now, sort the orders by flower name
      this.orders.sort((a, b) => {
        const flowerA = a.flowers.find((flower) =>
          flower.name.toLowerCase().includes(searchTerm)
        );
        const flowerB = b.flowers.find((flower) =>
          flower.name.toLowerCase().includes(searchTerm)
        );
  
        if (flowerA && flowerB) {
          const nameA = flowerA.name.toLowerCase();
          const nameB = flowerB.name.toLowerCase();
          return nameA.localeCompare(nameB);
        } else {
          // In case one of the orders has no matching flower, move it to the end of the list
          return flowerA ? -1 : 1;
        }
      });
    } else {
      // If the search term is empty, reset the list to the original full list of items
      this.orders = this.originalOrders.slice();
  
      // Sort the orders by flower name
      this.orders.sort((a, b) => {
        const nameA = a.flowers[0].name.toLowerCase();
        const nameB = b.flowers[0].name.toLowerCase();
        return nameA.localeCompare(nameB);
      });
    }
  }
  

  fetchOrders() {
    const headers = new HttpHeaders().set('Authorization', this.token || '');

    this.http
      .get<Order[]>(`${this.serverUrl}/api/orders`, { headers })
      .subscribe(
        (response) => {
          this.originalOrders = response;
          this.handleSearch()
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
  }

  handleCancel(orderId: string) {
    const headers = new HttpHeaders().set('Authorization', this.token || '');

    this.http
      .put(
        `${this.serverUrl}/api/orders/${orderId}/cancel`,
        null,
        { headers }
      )
      .subscribe(
        () => {
          this.updateOrderStatus(orderId, 'Cancelled');
          this.fetchOrders();
          // this.showSnackbar();
        },
        (error) => {
          console.error('Error canceling order:', error);
        }
      );
  }

  handleRemove(orderId: string) {
    const headers = new HttpHeaders().set('Authorization', this.token || '');

    this.http
      .delete(`${this.serverUrl}/api/orders/${orderId}`, {
        headers,
      })
      .subscribe(
        () => {
          this.originalOrders = this.originalOrders.filter((order) => order._id !== orderId);
          this.fetchOrders();
          // this.showSnackbar();
        },
        (error) => {
          console.error('Error removing order:', error);
        }
      );
  }

  calculateTotalPrice(flowers: Flower[]) {
    let totalPrice = 0;
    flowers.forEach((flower) => {
      totalPrice += flower.quantity * flower.price;
    });
    return totalPrice.toFixed(2);
  }

  updateOrderStatus(orderId: string, status: string) {
    this.originalOrders = this.originalOrders.map((order) => {
      if (order._id === orderId) {
        return { ...order, status: status };
      }
      return order;
    });
  }

  // showSnackbar() {
  //   this.snackbarOpen = true;
  //   this.snackBar.open('Order Update Success', 'Close', {
  //     duration: 3000,
  //     panelClass: 'success-snackbar',
  //   });
  // }
}
