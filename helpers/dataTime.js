const formatNumber = (value) => {
  return value.toString().padStart(2, "0");
};

const getCurentMonth = () => {
  const currentDate = new Date();

  // Отримати номер поточного місяця (від 0 до 11, де 0 - січень, 1 - лютий і т.д.)
  const currentMonth = currentDate.getMonth() + 1;
  const currentYearh = new Date().getFullYear();

  return `${currentYearh}-${formatNumber(currentMonth)}-`;
};

module.exports = { getCurentMonth };
