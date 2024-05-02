import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'palo'
})
export class PaloPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 4:
        return 'Oros';
      case 1:
        return 'Bastos';
      case 2:
        return 'Copas';
      case 3:
        return 'Espadas';
      default:
        return value.toString();
    }
  }

}
