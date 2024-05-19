import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {
  transform(value: string): string {
    let result = '';
    if(value.length > 16){
      result = result + value.substring(8,10) + '/' + value.substring(5,7) + '/' + value.substring(0,4) + ' ' + value.substring(11,16);
    }
    return result;
  }
}
