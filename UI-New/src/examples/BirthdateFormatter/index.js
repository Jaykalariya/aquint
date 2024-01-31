function BirthdateFormatter(milliseconds) {
  const date = new Date(milliseconds);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

export default BirthdateFormatter;
