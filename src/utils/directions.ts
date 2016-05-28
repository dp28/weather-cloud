export enum CompassDirections {
  N, NNE, NE, ENE,
  E, ESE, SE, SSE,
  S, SSW, SW, WSW,
  W, WNW, NW, NNW
}

const numDirections = 16;
const degreesPerDirection = 360 / numDirections;
const halfDegreesPerDirection = degreesPerDirection / 2;

export function meteorologicalAngleToCompassDirection(meteorologicalAngle: number): string {
  return bearingToCompassDirection(meteorologicalAngleToBearing(meteorologicalAngle));
}

export function meteorologicalAngleToBearing(meteorologicalAngle: number): number {
  return meteorologicalAngle + halfDegreesPerDirection;
}

export function bearingToCompassDirection(bearing: number): string {
  const directionIndex = Math.floor(bearing / degreesPerDirection) % numDirections;
  return CompassDirections[directionIndex];
}
