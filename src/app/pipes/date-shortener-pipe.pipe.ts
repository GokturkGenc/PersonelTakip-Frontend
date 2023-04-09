import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateShortener'
})
export class DateShortenerPipe implements PipeTransform {

  transform(value: Date): string {
    return value.toLocaleDateString('tr-TR');
  }

}