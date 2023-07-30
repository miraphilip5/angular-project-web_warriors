import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Flower } from 'src/app/models/flower';
import { FlowerService } from 'src/app/services/flower.service';
@Component({
  selector: 'app-flowers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flowers.component.html',
  styleUrls: ['./flowers.component.css']
})
export class FlowersComponent {
  flowers: Flower[] = [];
  constructor(private _http: HttpClient, private _flowerService: FlowerService) {}
  ngOnInit(): void {
    this._flowerService.getFlowers().subscribe((data) => (this.flowers = data));
  }
}
