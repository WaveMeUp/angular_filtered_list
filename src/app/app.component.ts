import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {LectureService} from './services/lecture.service';
import {Lecture} from './interfaces/lecture';
import {Filters} from './interfaces/filters';
import {Level, Locale} from './interfaces/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // why not?
})
export class AppComponent implements OnInit {
  title = 'Let\'s Filter It!';
  lectures: Lecture[] = [];
  languages: Locale[] = [];
  levels: Level[] = [];
  filters: Filters;

  constructor(private lectureService: LectureService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getLectures();
  }

  getLectures(): void {
    this.lectureService.getLectures().subscribe(lectures => {
      if (lectures.length > 0) {
        this.lectures = lectures;
        try {
          /**
           * Collect available languages and levels for filtering.
           * This way we can work with any amount languages and levels items.
           */
          this.lectures.forEach(l => {
            const lan: string = l.language.toLowerCase();
            const level: string = l.level.toLowerCase();
            if (!this.languages.includes(lan as Locale)) { this.languages.push(lan as Locale); }
            if (!this.levels.includes(level as Level)) { this.levels.push(level as Level); }
          });

          // a little bit of костыли for OnPush
          this.languages = this.languages.slice();
          this.levels = this.levels.slice();
        } catch (e) {
          console.error(`Something went wrong during lectures parsing: ${e}`);
        }
        this.cdr.detectChanges();
      } else {
        console.warn('Empty lectures array');
      }
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
