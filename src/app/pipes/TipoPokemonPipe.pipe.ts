import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoPokemon'
})
export class TipoPokemonPipe implements PipeTransform {

  transform(tipo: { name: string; code: string }): string {
    if (!tipo) return 'Tipo desconocido';
    return tipo.name;
  }

}
