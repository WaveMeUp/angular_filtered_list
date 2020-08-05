import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Lecture} from '../../interfaces/lecture';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LectureComponent implements OnInit {
  @Input() lecture: Lecture;

  constructor() { }

  ngOnInit(): void {
  }

}
