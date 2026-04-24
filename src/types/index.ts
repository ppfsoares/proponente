export interface UserProfile {
  id: string;
  name: string;
  areaCultural: string;
  location: string;
}

export interface Edital {
  id: string;
  title: string;
  value: number;
  deadline: string;
  matchScore: number;
}
