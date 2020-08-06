import {Level, Locale} from './types';

export interface Filters {
  searchString: string;
  levels: Record<Level, boolean>;
  languages: Record<Locale, boolean>;
}
