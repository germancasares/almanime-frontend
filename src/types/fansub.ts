import { DateTime } from 'luxon';

export type FansubDTO = {
  acronym: string;
  name: string;
  webpage?: string;
};

export type Fansub = {
  acronym: string;
  name: string;
  webpage?: string;
  creationDate: DateTime;
  members: number;
};