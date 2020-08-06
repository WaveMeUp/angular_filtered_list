import {Component, OnInit, EventEmitter, Output, Input, ChangeDetectionStrategy} from '@angular/core';

import {Filters} from '../../interfaces/filters';
import {Level, Locale} from '../../interfaces/types';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // why not?
})
export class FiltersComponent implements OnInit {
  @Output() filterChange = new EventEmitter<Filters>();

  /**
   * I thought about uniting both 'languages' and 'levels' into one group
   * but this way actually would be less flexible
   */
  @Input() languages: Locale[];
  @Input() levels: Level[];
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
