import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordWrap',
})
export class WordWrapPipe implements PipeTransform {
  transform(value: string, length: number): string {
    if(!length) return value;
    if(value?.length <= length) return value;
    return `${value.substring(0, length)}...`;
  }
}
