import { Component, OnInit } from '@angular/core';
import { Bodega } from '../../../../core/models/Bodega';
import { BodegaService } from './services/bodega.service';
import { DialogService } from '../../../../components/notification/services/dialog.service';

@Component({
  selector: 'app-bodegas',
  templateUrl: './bodegas.component.html',
  styleUrl: './bodegas.component.css'
})
export class BodegasComponent implements OnInit {

  bodegaSeleccionada!: Bodega;
  listaBodegas!: Bodega[];
  id_usuario: any;
  id_empresa: any;
  idBodega:any
  alamcenNarancayImg:string = '../../../../../assets/img/bodega.jpg';
  movimientosImg:string = '../../../../../assets/img/movimientos.jpg';

  constructor(private bodegaService: BodegaService, private dialogService:DialogService) { }

  ngOnInit(): void {
    this.id_usuario = sessionStorage.getItem('idUsuario')
    this.id_empresa = sessionStorage.getItem('idEmpresa')
    this.listarBodegas()
  }

  listarBodegas() {
    this.bodegaService.getBodegas(this.id_usuario, this.id_empresa).subscribe(
      (listarBodegas:Bodega[]) => this.listaBodegas=listarBodegas
    )
  }

  BodegaSelecccionada(bodega: Bodega) {
    this.bodegaSeleccionada = bodega;
    sessionStorage.setItem('bodId', String(this.bodegaSeleccionada.bod_codigo));
    this.dialogService.abrirConfirmacion(bodega.bod_nombre);
  }

  ingresarMovimientos(nombreBodega: string){
    console.log(nombreBodega);
    console.log('------------------------------------------------------------------------');
    
    for(let bod of this.listaBodegas){
      console.log(nombreBodega);
      console.log(bod.bod_nombre);
      
      if(/BOD. ZHUCAY/.test(nombreBodega) && /BOD. ZHUCAY/.test(bod.bod_nombre)){
        console.log('ingresa a movimientos en zhucay');
        break;
      }else if(/ALMACEN NARANCAY/.test(nombreBodega)&&/ALMACEN NARANCAY/.test(bod.bod_nombre)){
        console.log('ingresa a movimientos en narancay');
        break;
      }
    }
  }

}
