import { Fansub } from 'types/fansub';
import { Member } from 'types/member';
import { Subtitle } from 'types/subtitle';

export type State = {
  fansub: Fansub,
  members: Member[],
  subtitles: Subtitle[],
  isMember: boolean,
};
