import {
  AllCalculate,
  ImcCalculate,
  MeasurementsCalculate,
} from "../interfaces/gym-calcules.interface";

export class GymCalcules {
  public static calculateBodyDensity(measurements: MeasurementsCalculate) {
    const {
      chest,
      axillary,
      tricep,
      subscapular,
      abdominal,
      suprailiac,
      thigh,
      age,
      sex,
    } = measurements;

    const sum =
      Number(chest) +
      Number(axillary) +
      Number(tricep) +
      Number(subscapular) +
      Number(abdominal) +
      Number(suprailiac) +
      Number(thigh);

    let bodyDensity;

    if (sex.toUpperCase() === "FEMALE") {
      bodyDensity =
        1.097 -
        0.00046971 * sum +
        0.00000056 * sum * sum -
        0.00012828 * Number(age);
    } else {
      bodyDensity =
        1.112 -
        0.00043499 * sum +
        0.00000055 * sum * sum -
        0.00028826 * Number(age);
    }

    return parseFloat(bodyDensity.toFixed(2));
  }

  public static calculateBodyFat(bodyDensity: number) {
    const bodyFatPercentage = (4.95 / Number(bodyDensity) - 4.5) * 100;

    return parseFloat(bodyFatPercentage.toFixed(2));
  }

  public static calculateIMC(imcData: ImcCalculate) {
    const { weight, height } = imcData;
    const imc = Number(weight) / (Number(height) * Number(height));

    return parseFloat(imc.toFixed(2));
  }
  public static calculateAll(data: AllCalculate) {
    const bodyDensity = this.calculateBodyDensity(data);
    const bodyFat = this.calculateBodyFat(bodyDensity);
    const imc = this.calculateIMC({ weight: data.weight, height: data.height });
    return {
      bodyDensity,
      bodyFat,
      imc,
    };
  }
}
