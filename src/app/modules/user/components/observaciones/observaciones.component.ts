import {Component, OnInit} from '@angular/core';
import {faArrowRightFromBracket, faListUl, faMessage, faSearch} from "@fortawesome/free-solid-svg-icons";
import {ObservacionesService} from "../services/observaciones.service";
import {Observacion} from "../../../../core/models/Observaciones";
import {ProductoService} from "../services/producto.service";
import {Producto} from "../../../../core/models/Producto";
import {Correccion} from "../../../../core/models/Correccion";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ObservacionCorrecion} from "../../../../core/models/ObservacionCorreccion";
import {Router} from "@angular/router";

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html',
  styleUrl: './observaciones.component.css'
})
export class ObservacionesComponent implements OnInit{
  constructor(private observacionService:ObservacionesService,private productoService:ProductoService,private route:Router) {}

  observaciones:Observacion[]=[];
  producto!:Producto;
  observacion!:Observacion;
  observacionSeleccionada!:Observacion;
  obCorr!:ObservacionCorrecion;
  detalleOb!:string;
  novedad!:string;
  correccion!:Correccion;
  barraItem!:string;
  vistaAddObservacion=false;
  vistaCorreccion=false;
  ngOnInit(): void {
      this.listarObservaciones()
  }

  listarObservaciones():void{
    this.observacionService.getObservaciones().subscribe(
      (lista:Observacion[]) =>{
        this.observaciones=lista;
      }
    )
  }

  mostrarProducto(){
    this.productoService.getProducto(this.barraItem).subscribe(
      (producto:Producto) =>{
        this.producto=producto;
        this.barraItem='';
      },error =>{
        alert('Producto no encontrado')
        this.barraItem='';
    }
    )
  }

  guardarObservacion(){
    const usuarioLocalStorage = localStorage.getItem('usuario') ?? 'ValorPredeterminado';
    this.observacion=  new Observacion()
    this.observacion.item=this.producto.pro_id1;
    this.observacion.descripcion=this.producto.pro_nombre;
    this.observacion.unidad=this.producto.unidad;
    this.observacion.bulto=this.producto.bulto;
    this.observacion.cxb=this.producto.cxb;
    this.observacion.stock=this.producto.stock_real;
    this.observacion.precio=this.producto.pvp;
    this.observacion.detalle=this.detalleOb;
    this.observacion.usuario=usuarioLocalStorage;

    this.observacionService.guardar(this.observacion).subscribe(
      obs =>{
        this.listarObservaciones();
        this.cerrarVentana();
      },error =>{
        alert('Ingreso no valido');
    }
    )
  }

  agregarCorreccion(){
    const usuarioLocalStorage = localStorage.getItem('usuario') ?? 'ValorPredeterminado';
    this.obCorr=new ObservacionCorrecion();
    this.obCorr.observacion=this.observacionSeleccionada;
    this.correccion= new Correccion()
    this.correccion.detalle=this.novedad;
    this.correccion.usuario=usuarioLocalStorage;
    this.obCorr.correccion=this.correccion;

    this.observacionService.agregarCorreccion(this.obCorr).subscribe(
      data=>{
        if (data){
          this.listarObservaciones();
          this.cerrarVentanaCorreccion();
        }
      },error =>{
        alert('Novedad no registrada')
      }
    )
  }

  selecionarObservacion(observacion:Observacion){
    this.observacionSeleccionada=observacion
    console.log(this.observacionSeleccionada)
  }
  abrirVentana(){
    this.vistaAddObservacion=true;
  }
  cerrarVentana(){
    this.vistaAddObservacion=false;
  }
  abrirVentanaCorreccion(){
    this.vistaCorreccion=true;
  }
  cerrarVentanaCorreccion(){
    this.vistaCorreccion=false;
  }

  logout(){
    localStorage.clear();
    this.route.navigate(['/Cumpleaños/inicio/login'])
  }


  protected readonly faListUl = faListUl;
  protected readonly faMessage = faMessage;
  protected readonly faArrowRightFromBracket = faArrowRightFromBracket;
  protected readonly faSearch = faSearch;
}
