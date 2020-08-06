import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Lecture} from '../interfaces/lecture';
import {LECTURES} from '../mocks/mock-lectures';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  constructor(private http: HttpClient) { }

  getLectures(): Observable<Lecture[]> {
    // return new Observable<Lecture[]>(subscriber => subscriber.next(LECTURES));
    // simple JSON response, bot mock works too
    return this.http.get<Lecture[]>('https://functions.yandexcloud.net/d4ev82r8mr2lbnjja7ge');
  }
}
