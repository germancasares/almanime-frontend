import { withAuthenticationRequired } from '@auth0/auth0-react';

import { Routes } from 'types/typescript/routes';

import Create from './create';
import Editor from './editor';
import Upload from './upload';

const toCreateSubtitle = (fansubAcronym: string): string => `/subtitle/${fansubAcronym}/create`;
const toUploadSubtitle = (fansubAcronym: string): string => `/subtitle/${fansubAcronym}/upload`;
const toSubtitleEditor = (
  fansubAcronym: string,
  animeSlug: string,
  episodeNumber: string,
): string => `/subtitle/${fansubAcronym}/editor/${animeSlug}/${episodeNumber}`;

const routes: Routes = {
  create: {
    path: toCreateSubtitle(':fansubAcronym'),
    to: toCreateSubtitle,
    component: withAuthenticationRequired(Create),
  },
  upload: {
    path: toUploadSubtitle(':fansubAcronym'),
    to: toUploadSubtitle,
    component: withAuthenticationRequired(Upload),
  },
  editor: {
    path: toSubtitleEditor(':fansubAcronym', ':animeSlug', ':episodeNumber'),
    to: toSubtitleEditor,
    component: withAuthenticationRequired(Editor),
    hideFooter: true,
  },
};

export default routes;
