const twoDigits = (number: Number) => {
  return number >= 10 ? number : "0"+number.toString();
}

export default twoDigits;