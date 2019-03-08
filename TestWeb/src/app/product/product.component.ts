import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { IProduct } from '../model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any = [];  
  constructor(private _productService: ProductService) {    
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = [];
    this._productService.getAllProduct()
      .subscribe(result => {
        console.log(result);
        this.products = result;       
      }, error => console.error(error));
  }
}
