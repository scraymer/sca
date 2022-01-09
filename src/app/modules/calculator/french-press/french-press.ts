export interface FrenchPressInput {
  amount: number;
  strength: number;
  measurement: MeasurementSystem;
}

export interface FrenchPressOutput {
  coffee: number;
  water: number;
  time: number;
  grind: string;
  measurement: MeasurementSystem;
}

export type MeasurementSystem = 'imperial' | 'metric';
