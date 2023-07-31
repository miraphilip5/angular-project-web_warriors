import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Flower } from 'src/app/models/flower';
import { FlowerService } from 'src/app/services/flower.service';

@Component({
  selector: 'app-flower-detail',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './flower-detail.component.html',
  styleUrls: ['./flower-detail.component.css']
})
export class FlowerDetailComponent implements OnInit {
  flower: Flower | null = null;
  qty: string = '1';
  id: number = 0;
  stockOptions: number[] = [];
  constructor(private _route: ActivatedRoute,
    private _flowerService: FlowerService) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];
    this._flowerService.getFlowerById(this.id).subscribe((data) => {
      this.flower = data;
      if (this.flower) {
        this.stockOptions = Array.from({ length: this.flower.stock }, (_, i) => i + 1);
      }
    });
    
  }

  handleAddToCart() {
    
  }

}
