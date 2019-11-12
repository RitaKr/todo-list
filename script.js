let tasks = [
  {
    id: 1,
    title: "Выучить JS",
    text: "Ходить на курсы. Делать домашки",
    completed: false
  },
  {
    id: 2,
    title: "Выучить React",
    text: "Ходить на курсы. Делать домашки. Читать документацию",
    completed: false
  }
];

(function(arrTasks) {
  const objectOfTasks = arrTasks.reduce((acc, task) => {
    acc[task.id] = task;
    return acc;
  }, {});
  console.log("objectOfTasks", objectOfTasks);
  function renderAllTasks(taskList) {
    Object.values(taskList).forEach(task => {
      console.log(task);
      const li = listItem(task);
    });
  }
  function listItem({ id, title, text }) {
    console.log(id, title, text);
  }
  renderAllTasks(objectOfTasks);
})(tasks);
