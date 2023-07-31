import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Flower } from 'src/app/models/flower';
import { FlowerService } from 'src/app/services/flower.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-flower-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flower-detail.component.html',
  styleUrls: ['./flower-detail.component.css']
})
export class FlowerDetailComponent implements OnInit {
  flower: Flower | null = null;
  qty: string = '1';
  id: number = 0;
  stockOptions: number[] = [];
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _flowerService: FlowerService,
    private _cartService: CartService) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];
    this._flowerService.getFlowerById(this.id).subscribe((data) => {
      this.flower = data;
      console.log("flower",this.flower)
      if (this.flower) {
        this.stockOptions = Array.from({ length: this.flower.stock }, (_, i) => i + 1);
      }
    });

  }

  async handleAddToCart() {
    try {
      if (this.flower) {
        const qty = parseInt(this.qty)
        const response = await this._cartService.saveToCart(this.flower, qty).toPromise();
        console.log('Item added to cart:', response);
        this._router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  }

}
