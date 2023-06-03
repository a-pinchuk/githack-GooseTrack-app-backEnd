const { serviceAddTasks } = require("../../services/tasks");

const typeCategory = ["to-do", "in-progress", "done"];

const typePriority = ["low", "medium", "high"];

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createOneTask = async (year, month, day) => {
  const category = typeCategory[random(0, 2)];
  const priority = typePriority[random(0, 2)];
  const startHour = random(9, 18);

  const startMinute = random(0, 50);
  const durationMinute = random(15, 45);
  let endMinute = startMinute + durationMinute;
  let endHour = startHour;

  if (endMinute >= 60) {
    endHour = startHour + Math.floor(endMinute / 60);
    endMinute %= 60;
  }

  const startTimeString = `${startHour
    .toString()
    .padStart(2, "0")}:${startMinute.toString().padStart(2, "0")}`;
  const endTimeString = `${endHour.toString().padStart(2, "0")}:${endMinute
    .toString()
    .padStart(2, "0")}`;

  const task = {
    title: `My task  ${priority} ${category} ${startTimeString}-${endTimeString}`,
    date: `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`,
    start: startTimeString,
    end: endTimeString,
    priority: priority,
    category: category,
  };

  await serviceAddTasks(task);
};

const createTasks = (numMonth) => {
  if (!numMonth) return;

  const currentYearh = new Date().getFullYear();

  // Отримати кількість днів у поточному місяці
  const daysInMonth = new Date(currentYearh, numMonth, 0).getDate();

  for (let day = 1; day <= daysInMonth; day += 1) {
    const countTask = random(8, 20);
    for (let numTask = 1; numTask <= countTask; numTask += 1) {
      createOneTask(currentYearh, numMonth, day);
    }
  }
};

const createTestData = async (req, res) => {
  createTasks(6);

  res.status(200).json({ code: 200, data: "OK" });
};

module.exports = { createTestData };
