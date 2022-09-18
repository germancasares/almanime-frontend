import { Duration } from 'luxon';

export const STYLE_BOOLEAN_FIELDS = [
  'Bold', 'Italic', 'Underline', 'StrikeOut',
];
export const STYLE_NUMBER_FIELDS = [
  'Fontsize', 'ScaleX', 'ScaleY', 'Spacing', 'Angle', 'BorderStyle', 'Outline', 'Shadow', 'Alignment', 'MarginL',
  'MarginR', 'MarginV', 'Encoding',
];
export type V4PlusStyle = {
  Name: string;
  Fontname: string;
  Fontsize: number;
  PrimaryColour: string;
  SecondaryColour: string;
  OutlineColour: string;
  BackColour: string;
  Bold: boolean;
  Italic: boolean;
  Underline: boolean;
  StrikeOut: boolean;
  ScaleX: number;
  ScaleY: number;
  Spacing: number;
  Angle: number;
  BorderStyle: number;
  Outline: number;
  Shadow: number;
  Alignment: number;
  MarginL: number;
  MarginR: number;
  MarginV: number;
  Encoding: number;
};

export type SubText = {
  subText: string;
  // TODO: styleOverrides to be a string[]
  styleOverrides: string;
};
export const DIALOGUE_DURATION_FIELD = [
  'Start', 'End',
];
export const DIALOGUE_NUMBER_FIELD = [
  'Layer', 'MarginL', 'MarginR', 'MarginV',
];
export type Dialogue = {
  Layer: number;
  Start: Duration;
  End: Duration;
  Style: string;
  Name: string | undefined;
  MarginL: number;
  MarginR: number;
  MarginV: number;
  Effect: string | undefined;
  Text: string;
};

export const INFO_NUMBER_FIELDS = [
  'PlayResX', 'PlayResY', 'Video Aspect Ratio', 'Video Position', 'Video Zoom', 'WrapStyle',
];
export type Info = {
  Collisions: string;
  ['Last Style Storage']: string;
  PlayResX: number;
  PlayResY: number;
  ScaledBorderAndShadow: string;
  ScriptType: string;
  Title: string;
  ['Video Aspect Ratio']: number;
  ['Video File']: string;
  ['Video Position']: number;
  ['Video Zoom']: number;
  WrapStyle: number;
};

interface SSASubtitle {
  ['Script Info']: Info;
  ['V4+ Styles']: V4PlusStyle[];
  Events: Dialogue[];

  toString(): string;
}

export default SSASubtitle;
