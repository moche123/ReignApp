import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrangedate'
})
export class ArrangedatePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]) {
    let newVal = value.sort((a: any, b: any) => { 
      let date1 = new Date(a.created_at);
      let date2 = new Date(b.created_at);

      if (date2 > date1) {
          return 1;
      } else if (date2 < date1) {
          return -1;
      } else {
          return 0;
      }
    });

    return newVal;
  }

}
