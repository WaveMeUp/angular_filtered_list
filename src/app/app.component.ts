import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {LectureService} from './services/lecture.service';
import {Lecture} from './interfaces/lecture';
import {Filters} from './interfaces/filters';
import {Level, Locale} from './interfaces/types';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'Let\'s Filter It!';
  lectures: Observable<Lecture[]>;
  filters: Filters;

  constructor(private lectureService: LectureService) {
  }

  ngOnInit(): void {
    this.lectures = this.lectureService.getLectures();
  }

  onFilterChange(changedData: Filters): void {
    this.filters = {
      searchString: changedData.searchString,
      levels: changedData.levels,
      languages: changedData.languages
    };
  }
}
