import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiempoDesdeActualizacion'
})
export class TiempoDesdeActualizacionPipe implements PipeTransform {
 
  transform(fecha: string): number {
    if (!fecha) return 0;
    const fechaActual = new Date();
    const fechaActualizacion = new Date(fecha);
    const diferencia = Math.floor((fechaActual.getTime() - fechaActualizacion.getTime()) / (1000 * 3600 * 24));
    return diferencia;
  }

}
