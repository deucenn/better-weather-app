function FahrenheitToCelsius(temp) {
  temp -= 32;
  temp *= 5 / 9;
  return Math.round(temp);
}

function MphToKmh(speed) {
  return Math.round(speed * 1.609);
}

export { FahrenheitToCelsius, MphToKmh };
