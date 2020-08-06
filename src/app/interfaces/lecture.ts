import {Level, Locale} from './types';

export interface Lecture {
  title: string;
  author: string;
  language: Locale;
  level: Level;
}
