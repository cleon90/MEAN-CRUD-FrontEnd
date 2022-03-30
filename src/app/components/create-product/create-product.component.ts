import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { producto } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup
  titulo = 'Crear Producto';
  id: string | null;

  constructor(private fb: FormBuilder,
              private router : Router,
              private toastr: ToastrService,
              private _productService: ProductService,
              private aRouter: ActivatedRoute) {

    this.productForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.esEditar()
  }


  agregarProducto(){    
    const PRODUCTO: producto = {
      name: this.productForm.get('producto')?.value,
      category: this.productForm.get('categoria')?.value,
      location: this.productForm.get('ubicacion')?.value,
      price: this.productForm.get('precio')?.value,
    }

    if(this.id !== null){
      //editar producto
      this._productService.editProduct(this.id, PRODUCTO).subscribe(data =>{
        this.toastr.info("El producto fue actualizado correctamente");
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productForm.reset();
      })

    }else{
      //agregar producto
      this._productService.createProducto(PRODUCTO).subscribe(data => {
        this.toastr.success('El producto fue creado con éxito', 'Producto creado');
        this.router.navigate(['/']);
      },error => {
        console.log(error);
        this.productForm.reset();
      })
    }
  }

  esEditar() {
    if(this.id !== null){
      this.titulo = 'Editar producto';
      this._productService.getProducto(this.id).subscribe(data => {
        this.productForm.setValue({
          producto: data.name,
          categoria: data.category,
          ubicacion: data.location,
          precio: data.price,
        })
      })
    };
  }
}
