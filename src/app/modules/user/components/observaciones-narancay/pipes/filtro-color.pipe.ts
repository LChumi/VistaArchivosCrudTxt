import { Pipe, PipeTransform } from '@angular/core';
import { Observacion } from '../../../../../core/models/Observaciones';

@Pipe({
  name: 'filtroColor'
})
export class FiltroColorPipe implements PipeTransform {

  transform(observaciones:Observacion[],color:string): Observacion[] {
    if(!color || color==='todos'){
      return observaciones;
    }

    return observaciones.filter(observacion =>{
      const colorObservacion=this.tieneCorreccion(observacion);
      return colorObservacion ===color;
    });

  }

  public tieneCorreccion(observacion: Observacion): string {
    const hoy = new Date();
    const fechaObservacion = this.convertirStringAFecha(observacion.fecha);

    // Si tiene corrección, devolver 'verde'
    if (observacion.correccion !== null) {
      return 'verde';
    }
    // Obtener el primer día del mes actual
    const primerDiaMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    // Si la fecha está en el último mes y hasta la fecha actual, devolver 'tomate'
    if (fechaObservacion >= primerDiaMesActual && fechaObservacion <= hoy) {
      return 'tomate';
    }
    // Si la fecha es anterior al último mes, devolver 'rojo'
    if (fechaObservacion < primerDiaMesActual) {
      return 'rojo';
    }
    // En cualquier otro caso, devolver ''
    return '';
  }

  private convertirStringAFecha(fechaString: string): Date {
    const [dia, mes, anio] = fechaString.split('-').map(Number);
    return new Date(anio, mes-1 , dia);
  }

}
