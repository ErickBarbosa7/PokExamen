import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creadoPor'
})
export class CreadoPorPipe implements PipeTransform {

  transform(creadoPor: string): string {
    if (!creadoPor) return 'Creador por: Desconocido'; 

    return `Creado por: ${creadoPor}`;
  }

}
