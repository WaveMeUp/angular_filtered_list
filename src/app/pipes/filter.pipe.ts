import { Pipe, PipeTransform } from '@angular/core';

import {Filters} from '../interfaces/filters';
import {Lecture} from '../interfaces/lecture';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Lecture[], filters: Filters): Lecture[] {
    if (!items || items.length === 0) { return []; }
    if (!filters) { return items; }
    const searchText = filters.searchString.toLowerCase();
    let result;
    result = items.filter( ({title, author}) => {
      // only title and author because for language and level we use checkboxes
      return title.toLowerCase().includes(searchText) || author.toLowerCase().includes(searchText);
    });

    Object.keys(filters.levels).forEach(level => {
      if (filters.levels[level]) {
        result = result.filter(it => {
          return it.level.toLowerCase().includes(level.toLowerCase());
        });
      }
    });

    Object.keys(filters.languages).forEach(lang => {
      if (filters.languages[lang]) {
        result = result.filter(it => {
          return it.language.toLowerCase().includes(lang.toLowerCase());
        });
      }
    });
    return result;
  }

}
