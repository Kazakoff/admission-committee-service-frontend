import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfilter',
  pure: false
})
export class MyFilterPipe implements PipeTransform {
  transform(items: any[], filter: Object): any {
    if (!items) {
      return items;
    }
    if (!filter) {
      return items.filter(item => item.id === -1);
    }
    return items.filter(item => item.id === filter);
  }
}
