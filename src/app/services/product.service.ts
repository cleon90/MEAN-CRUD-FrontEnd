import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { producto } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:4000/api/productos/';

  constructor( private http: HttpClient) { }

  getProductos():  Observable<any> {
    return this.http.get(this.url);
  }

  deleteProducto(id: String): Observable<any>{
    return this.http.delete(this.url + id);
  }

  createProducto( producto:producto): Observable<any>{
    return this.http.post(this.url, producto);
  }

  getProducto(id: String): Observable<any>{
    return this.http.get(this.url + id);
  }

  editProduct(id: String, product: producto): Observable<any>{
    return this.http.put(this.url + id, product);
  }
}
