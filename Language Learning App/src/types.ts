export interface Word {
  id: string;
  norwegian: string;
  english: string;
}

export interface Folder {
  id: string;
  name: string;
  words: Word[];
}
