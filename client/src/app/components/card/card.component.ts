import { Component, Input } from '@angular/core';
import { Product } from "../../classes/product"
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent  {
  @Input() product!: Product; // Receive product data as input
}
