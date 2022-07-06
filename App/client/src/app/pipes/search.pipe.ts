import { MatSnackBar } from '@angular/material/snack-bar';
import { Pipe, PipeTransform } from '@angular/core';
import { Whiskey } from '../models/whiskey';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {

  constructor(private snackBar: MatSnackBar) {}

  transform(items: Whiskey[], value: string): any {
    if(!items) return []
    if(!items || !value) return items

    return items.filter(whiskey => whiskey.name.toLowerCase().includes(value.toLowerCase()))
  }

}
