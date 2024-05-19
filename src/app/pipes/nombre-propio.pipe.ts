import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombrePropio'
})
export class NombrePropioPipe implements PipeTransform {

  transform(value: string): string {
    let result = value;
    if(value.length>1){
      result = value.charAt(0).toUpperCase() + value.substring(1).toLowerCase();
    }
    return result;
  }

}
