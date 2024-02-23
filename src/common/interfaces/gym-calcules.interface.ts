export interface MeasurementsCalculate {
  sex: string;
  age: number;
  chest: number;
  axillary: number;
  tricep: number;
  subscapular: number;
  abdominal: number;
  suprailiac: number;
  thigh: number;
}

export interface ImcCalculate {
  weight: number;
  height: number;
}

export interface AllCalculate extends MeasurementsCalculate, ImcCalculate {}
