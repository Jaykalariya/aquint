const IndianCurrency = (value) => {
  const formattedValue = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);
  return formattedValue;
};

export default IndianCurrency;
