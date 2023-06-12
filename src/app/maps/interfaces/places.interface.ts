export interface PlacesResponse {
  type: string;
  query: string[];
  features: Feature[];
  attribution: string;
}

export interface Feature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text_es: string;
  language_es?: Language;
  place_name_es: string;
  text: string;
  language?: Language;
  place_name: string;
  text_en: string;
  language_en?: Language;
  place_name_en: string;
  center: number[];
  geometry: Geometry;
  context: Context[];
  matching_text?: string;
  matching_place_name?: string;
}

export interface Context {
  id: string;
  mapbox_id: string;
  text_es: string;
  text: string;
  text_en: string;
  wikidata?: Wikidata;
  language_es?: Language;
  language?: Language;
  language_en?: LanguageEn;
  short_code?: ShortCode;
}

export enum Language {
  Es = 'es',
}

export enum LanguageEn {
  En = 'en',
}

export enum ShortCode {
  NI = 'ni',
  NIMn = 'NI-MN',
}

export enum Wikidata {
  Q260009 = 'Q260009',
  Q3274 = 'Q3274',
  Q811 = 'Q811',
}

export interface Geometry {
  coordinates: number[];
  type: string;
}

export interface Properties {
  foursquare: string;
  landmark: boolean;
  wikidata?: string;
  address?: string;
  category: string;
}
