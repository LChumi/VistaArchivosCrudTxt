import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {SugeridoShowroom} from "../../../../core/models/Sugerido";
import {ProductoShowroom} from "../../../../core/models/ProductoShowroom";
import {Producto} from "../../../../core/models/Producto";
import {SugeridoService} from "../../../../core/services/sugerido.service";
import {ImagenService} from "../../../../core/services/imagen.service";
import {Router} from "@angular/router";
import {ProductoService} from "../../../../core/services/producto.service";
import {faFileExcel, faFolderOpen, faFolderPlus, faSave, faSearch} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-sugeridos',
  templateUrl: './sugeridos.component.html',
  styleUrl: './sugeridos.component.css'
})
export class SugeridosComponent implements OnInit{

  productoSubscription!: Subscription;
  listaSugeridos:        SugeridoShowroom[]=[]
  productosFiltrados:    ProductoShowroom[]=[]
  sugerido!:             SugeridoShowroom
  sugeridoSelect?:       SugeridoShowroom
  producto!:             Producto
  productoShowroom!:     ProductoShowroom

  detalle:          string='';
  barraItem:        string='';
  imageUrl:         string='';
  cantidad:         number=0;
  cantProd:         number=0;
  numProd:          number=0;
  searchItem:       string='';
  observacion:      string='';
  stockNarancay:    number=0;
  stockShowroom:    number=0;

  usuariosessionStorage = sessionStorage.getItem('usuario') ?? '';

  ventanaAddProd = false;
  botonBloq      = false;

  constructor(private sugeridoService:SugeridoService,
              private imagenService:ImagenService,
              private productoService: ProductoService,
              private route:Router) {
  }

  ngOnInit(): void {
    if (this.usuariosessionStorage == '') {
      alert('Vuelva a iniciar sesión')
      this.logout()
    }
    this.listarSugeridos();
  }

  listarSugeridos(){
    this.sugeridoService.listar().subscribe(
      (sugeridos) =>{
        this.listaSugeridos=sugeridos
      }
    )
  }

  buscarSugerdo(id:number,detalle:string){
    this.sugeridoService.buscarSugerido(id,detalle).subscribe(
      (sugerido:SugeridoShowroom)=>{
        this.sugeridoSelect=sugerido
        this.limpiar();
        this.numProd=sugerido.productoShowrooms.length
        this.actualizarProductosFiltrados();
        this.ventanaAddProd= !this.ventanaAddProd
      }
    )
  }

  nuevoSugerido(){
    if(!this.detalle){
      alert('Por favor ingrese el detalle del movimiento');
      return;
    }

    this.sugerido = new SugeridoShowroom()
    this.limpiar();
    this.sugerido.detalle= this.detalle.toUpperCase();
    this.sugerido.usuario= this.usuariosessionStorage;

    this.sugeridoService.guardar(this.sugerido).subscribe({
      next:sugerido => {
        this.listarSugeridos();
        this.detalle='';
        this.sugeridoSelect=sugerido
        this.ventanaAddProd = !this.ventanaAddProd

      },
      error:(error:any)=> {
        this.detalle= '';
      }
    })
  }

  agregarProducto(){
    if (!this.producto){
      alert("producto no escogido")
      this.botonBloq=false;
    }

    this.productoShowroom= new ProductoShowroom()
    this.productoShowroom.barra= this.producto.pro_id;
    this.productoShowroom.cantidad=this.cantidad;
    this.productoShowroom.descripcion = this.producto.pro_nombre;
    this.productoShowroom.item =this.producto.pro_id1;
    this.productoShowroom.observacion=this.observacion;
    this.productoShowroom.stockNc=this.stockNarancay;
    this.productoShowroom.stockZh=this.producto.stock_real
    this.productoShowroom.stockSh=this.stockShowroom


    if (this.sugeridoSelect && this.sugeridoSelect.id && this.sugeridoSelect.detalle) {
      this.sugeridoService.agregarProducto(this.sugeridoSelect.id, this.sugeridoSelect.detalle, this.productoShowroom).subscribe(
        sugerido=>{
          this.sugeridoSelect=sugerido
          this.buscarProductoCant(this.producto);
          this.cantidad=0;
          this.observacion=''
          this.stockShowroom=0;
          this.stockNarancay=0;
          this.numProd=sugerido.productoShowrooms.length
          this.actualizarProductosFiltrados();
          this.botonBloq=false;
        }
      );
    } else {
      alert('El movimiento seleccionado no tiene un ID o detalle definido.');
    }
  }

  eliminarProducto(producto: ProductoShowroom){
    console.log(producto)
    if (this.sugeridoSelect && this.sugeridoSelect.id && this.sugeridoSelect.detalle) {
      this.sugeridoService.eliminarProducto(this.sugeridoSelect.id, this.sugeridoSelect.detalle, producto).subscribe(
        sugerido=>{
          this.sugeridoSelect=sugerido
          this.actualizarProductosFiltrados()
          this.numProd=sugerido.productoShowrooms.length;
          this.cantidad=0;
          this.observacion=''
        }
      );
    } else {
      alert('El movimiento seleccionado no tiene un ID o detalle definido.');
    }
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
                this.cantidad=0;
              }
            },
            error => {
              this.imageUrl = '';
              this.cantidad=0;
            }
          )

          this.productoService.getProducto(10000566,producto.pro_id).subscribe(
            (prod) => this.stockNarancay=prod.stock_real
          )
          this.productoService.getProducto(10000569,producto.pro_id).subscribe(
            (prod) => this.stockShowroom=prod.stock_real
          )
          this.barraItem = '';
          this.botonBloq=true;
        },
        error: error => {
          alert('Producto no encontrado');
          this.barraItem = '';
          this.producto = new Producto();
        }
      });
  }

  buscarProductoCant(productoSis:Producto){
    if (this.sugeridoSelect?.productoShowrooms) {
      for (let producto of this.sugeridoSelect.productoShowrooms) {
        if(producto.item === productoSis.pro_id1){
          this.cantProd=producto.cantidad
          break;
        }
      }
    }
  }

  descargarExcel(){
    if (this.sugeridoSelect){
      this.sugeridoService.excelSugerido(this.sugeridoSelect).subscribe(
        (excelBlob: Blob) => {
          const  url = window.URL.createObjectURL(excelBlob);

          const a = document.createElement('a');
          a.href = url;
          a.download=`${this.sugeridoSelect?.detalle}.xlsx`
          document.body.appendChild(a)
          a.click();

          window.URL.revokeObjectURL(url);
          this.ventanaAddProd=!this.ventanaAddProd
        },
        error => {
          console.error(error)
        }
      )
    }

  }

  limpiar(){
    this.producto=new Producto()
    this.imageUrl=''
    this.cantProd=0;
  }

  filtrarProductos(){
    this.actualizarProductosFiltrados()
  }

  actualizarProductosFiltrados(){
    if (this.sugeridoSelect) {
      console.log(this.sugeridoSelect.productoShowrooms)
      this.productosFiltrados = this.sugeridoSelect.productoShowrooms.filter((prod) =>
        prod.item?.toLowerCase().includes(this.searchItem?.toLowerCase() || '')
      );
    } else {
      this.productosFiltrados = [];
    }
  }

  logout() {
    sessionStorage.clear();
    this.route.navigate(['/Cumpleaños/inicio/login'])
  }

  protected readonly faFolderOpen = faFolderOpen;
  protected readonly faFolderPlus = faFolderPlus;
  protected readonly faFileExcel = faFileExcel;
  protected readonly faSearch = faSearch;
  protected readonly faSave = faSave;
}
