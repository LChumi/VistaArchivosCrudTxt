/*
 * Copyright (c) 2024 Luis Chumi.
 * Este software está licenciado bajo la Licencia Pública General de GNU versión 3. Puedes encontrar una copia de la licencia en https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * Para consultas o comentarios, puedes contactarme en "luischumi.9@gmail.com".
 * Me gustaría ser reconocido por mi trabajo y estar abierto a colaboraciones o enseñanzas sobre el programa.
 */

import { Component, OnInit } from '@angular/core';
import { Bodega } from '../../../../core/models/Bodega';
import { BodegaService } from './services/bodega.service';
import { DialogService } from '../../../../components/notification/services/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bodegas',
  templateUrl: './bodegas.component.html',
  styleUrl: './bodegas.component.css'
})
export class BodegasComponent implements OnInit {

  bodegaSeleccionada!: Bodega;
  listaBodegas!: Bodega[];
  id_usuario = sessionStorage.getItem('idUsuario') ?? '';
  id_empresa = sessionStorage.getItem('idEmpresa') ?? '';
  idBodega:any
  alamcenNarancayImg:string = '../../../../../assets/img/bodega.jpg';
  movimientosImg:string = '../../../../../assets/img/movimientos.jpg';

  constructor(private bodegaService: BodegaService, private dialogService:DialogService,private router: Router) { }

  ngOnInit(): void {
    if (this.id_usuario == '' || this.id_empresa == '') {
      alert('Vuelva a iniciar sesión')
      this.logout()
    }
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

  ingresarMovimientos(nombreBodega: string) {
    switch (true) {
      case this.listaBodegas.some(bod => /SUGERIDOS/.test(nombreBodega)):
        this.router.navigate(['Cumpleaños/observaciones/sugeridos']);
        break;
      case this.listaBodegas.some(bod => /ALMACEN NARANCAY/.test(nombreBodega) && /ALMACEN NARANCAY/.test(bod.bod_nombre)):
        this.router.navigate(['Cumpleaños/observaciones/mov_narancay']);
        break;
      // Agrega más casos según sea necesario para otras bodegas
      default:
        alert('No tienes acceso a esta funcion')
        // Haz algo en caso de que el nombre de la bodega no coincida con ningún caso
        break;
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/Cumpleaños/inicio/login'])
  }


}
