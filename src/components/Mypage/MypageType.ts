export interface ExerciseRecord {
  createdAt: string;
  km: number | null;
  caExName: string | null;
  cardioExTime: string | null;
  part: string | null;
  stExName: string | null;
  remainingData: boolean;
  kg: number | null;
  rep: number | null;
  set: number | null;
  strengthTime: string | null;
  workoutId: number;
}

export interface ProcessedData {
  date: string;
  timeGroups: {
    exercises: ExerciseRecord[];
    time: string;
  }[];
}

export interface CardioDetails {
  caExName: string;
  km: number;
  time: string;
}

export interface StrengthDetails {
  part: string;
  stExName: string;
  kg: number;
  rep: number;
  set: number;
  time: string;
}
