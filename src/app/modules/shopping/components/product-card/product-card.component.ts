import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductItem } from '@modules/shopping/models';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  @Input() product: ProductItem;

  @Output() setFavorite = new EventEmitter<ProductItem>();

  constructor() { }

  ngOnInit(): void { }

  toggleFavorite($event: MouseEvent): void {
    $event.stopPropagation();
    this.setFavorite.emit(this.product);
  }
}
