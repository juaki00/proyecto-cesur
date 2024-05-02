import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cartaNombre'
})
export class CartaNombrePipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 8:
        return 'sota';
      case 9:
        return 'Caballo';
      case 10:
        return 'Rey';
      default:
        return value.toString();
    }
  }

}
