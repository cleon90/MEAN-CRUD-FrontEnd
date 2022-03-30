import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { producto } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  listProducts: producto[]=[];

  constructor( private _productoService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this._productoService.getProductos().subscribe(data => {
      console.log(data);
      this.listProducts = data;
    }, error => {
      console.log(error);
    })
  }

  deleteProduct(id: any){
    this._productoService.deleteProducto(id).subscribe(data =>{
      this.toastr.error('El producto fue eliminado con éxito', 'Producto eliminado');
      this.getProductos();
    }, error=>{
      console.log(error);
    })
  }

}
