function formatPrice(amount, currency = 'USD', locale = 'en-US') {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default formatPrice;
