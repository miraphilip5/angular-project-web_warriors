import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Flower } from 'src/app/models/flower';
import { FlowerService } from '../flower-detail/flower.service';
import { RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-flowers',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './flowers.component.html',
  styleUrls: ['./flowers.component.css']
})
export class FlowersComponent implements OnInit{
  flowers: Flower[] = [];
  //loggedInUser: string = '';

  constructor(private _http: HttpClient, private _flowerService: FlowerService, private router: Router) {}
  ngOnInit(): void {
    this._flowerService.getFlowers().subscribe((data) => (this.flowers = data));
    //this._flowerService.getLoginUserData().subscribe((data) => (this.loggedInUser = data.name));
  }

  // navigateToFlower(flowerId: number): void {
  //   this.router.navigate(['/flower', flowerId]);
  // }
}
