import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {LectureService} from './services/lecture.service';
import {Lecture} from './interfaces/lecture';
import {Filters} from './interfaces/filters';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // why not?
})
export class AppComponent implements OnInit {
  title = 'Let\'s Filter It!';
  lectures: Lecture[] = [];
  languages: string[] = [];
  levels: string[] = [];
  filters: Filters;

  constructor(private lectureService: LectureService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getLectures();
  }

  getLectures(): void {
    this.lectureService.getLectures().subscribe(lectures => {
      this.lectures = lectures;

      /**
       * Collect available languages and levels for filtering.
       * This way we can work with any amount languages and levels items.
       */
      this.lectures.forEach(l => {
        if (!this.languages.includes(l.language.toLowerCase())) { this.languages.push(l.language.toLowerCase()); }
        if (!this.levels.includes(l.level.toLowerCase())) { this.levels.push(l.level.toLowerCase()); }
      });

      // a little bit of костыли for OnPush
      this.languages = this.languages.slice();
      this.levels = this.levels.slice();
      this.cdr.detectChanges();
    });
  }

  onFilterChange(changedData: Filters): void {
    // because of OnPush change detection
    this.filters = {
      searchString: changedData.searchString,
      levels: changedData.levels,
      languages: changedData.languages
    };
  }
}
