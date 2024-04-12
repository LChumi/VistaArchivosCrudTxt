import { Component, OnInit } from '@angular/core';
import { MovimientosService } from '../../../../core/services/movimientos.service';
import { ImagenService } from '../../../../core/services/imagen.service';
import { Movimiento } from '../../../../core/models/Movimiento';
import { ProductoService } from '../../../../core/services/producto.service';
import { Producto } from '../../../../core/models/Producto';
import { ProductoMov } from '../../../../core/models/ProductoMov';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movimientos-narancay',
  templateUrl: './movimientos-narancay.component.html',
  styleUrl: './movimientos-narancay.component.css'
})
export class MovimientosNarancayComponent implements OnInit {

  productoSubscription!: Subscription;
  listaMovimientos:      Movimiento[] = []
  movimiento?:           Movimiento
  movSeleccionado?:      Movimiento
  producto?:             Producto
  productoMov?:          ProductoMov

  detalle:          string=''
  barraItem:        string=''
  imageUrl?:        string='';
  cantidad:         number=0;

  usuariosessionStorage = sessionStorage.getItem('usuario') ?? '';

  ventanaAddProd = false;


  constructor(private movimientoService: MovimientosService, private imagenService: ImagenService, private productoService: ProductoService) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  listarMovimientos(){
    this.movimientoService.listarNarancay().subscribe(
    (movimientos: Movimiento[]) =>{
      this.listaMovimientos=movimientos
    }
    )
  }

  nuevoMovimiento(){
    if(!this.detalle){
      alert('Por favort ingrese el detalle del movimiento');
      return;
    }

    this.movimiento = new Movimiento()
    this.movimiento.detalle= this.detalle.toUpperCase();
    this.movimiento.usuario= this.usuariosessionStorage;

    this.movimientoService.guardarNarancay(this.movimiento).subscribe({
      next:(mov: Movimiento) => {
        this.listarMovimientos();
        this.detalle='';
        this.ventanaAddProd = !this.ventanaAddProd
        
      },
      error:(error:any)=> {
        this.detalle= '';
      }
    })
  }

  agregarProducto(){

  }

  mostrarProducto() {
    this.producto = new Producto()
    if (!this.barraItem) {
      alert('Ingrese el item o la barra');
      return;
    }

    this.barraItem = this.barraItem.toUpperCase();
    this.productoSubscription = this.productoService.buscarProducto(this.barraItem)
      .subscribe({
        next: (producto: Producto) => {
          this.producto = producto;
          this.imagenService.getImagen(this.producto.pro_id + '.jpg').subscribe(
            data => {
              if (data) {
                const objectUrl = URL.createObjectURL(data);
                this.imageUrl = objectUrl;
              } else {
                this.imageUrl = '';
              }
            },
            error => {
              this.imageUrl = '';
            }
          )
          this.barraItem = '';
        },
        error: error => {
          alert('Producto no encontrado');
          console.log(error);
          this.barraItem = '';
          this.producto = new Producto();
        }
      });
  }

}
