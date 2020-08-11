import {Component, OnInit, EventEmitter, Output, Input, ChangeDetectionStrategy} from '@angular/core';

import {Filters} from '../../interfaces/filters';
import {Level, Locale} from '../../interfaces/types';
import {Lecture} from '../../interfaces/lecture';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements OnInit {
  @Output() filterChange = new EventEmitter<Filters>();

  /**
   * I thought about uniting both 'languages' and 'levels' into one group
   * but this way actually would be less flexible
   */
  languages: Locale[] = [];
  levels: Level[] = [];
  @Input() set lectures(lectures: Lecture[]) {
    if (lectures && lectures.length > 0) {
      /**
       * Collect available languages and levels for filtering.
       * This way we can work with any amount languages and levels items.
       */
      lectures.forEach(({language, level}) => {
        const lan: string = language.toLowerCase();
        const lev: string = level.toLowerCase();
        if (!this.languages.includes(lan as Locale)) { this.languages.push(lan as Locale); }
        if (!this.levels.includes(lev as Level)) { this.levels.push(lev as Level); }
      });
    }
  }
  filters: Filters;

  constructor() { }

  ngOnInit(): void {
    this.reset();
  }

  updateFilter(): void {
    this.filterChange.emit(this.filters);
  }

  /**
   * Reset all filters and send event to parent
   */
  reset(): void {
    this.filters = {
      searchString: '',
      levels: {
        hot: false,
        intermediate: false,
        hardcore: false,
        academic: false,
        advanced: false
      },
      languages: {
        en: false,
        ru: false
      }
    };
    this.updateFilter();
  }

}
