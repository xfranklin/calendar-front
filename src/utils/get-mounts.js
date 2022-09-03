export const getAllMonths = (locale) => {
  const applyFormat = new Intl.DateTimeFormat(locale, { month: "long" }).format;
  return [...Array(12).keys()].map((m) => applyFormat(new Date(2022, m)));
};
