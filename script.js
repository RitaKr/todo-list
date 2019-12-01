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
    const fragment = document.createDocumentFragment();
    Object.values(taskList).forEach(task => {
      console.log(task);
      const li = listItem(task);
      fragment.appendChild(li);
      const list = document.querySelector(".list");
      list.appendChild(fragment);
      //console.log(li);
    });
  }
  function listItem({ id, title, text }) {
    //console.log(id, title, text);
    const li = document.createElement("li");
    li.classList.add("item");

    const h2 = document.createElement("h2");
    h2.classList.add("title");
    h2.textContent = title;

    const p = document.createElement("p");
    p.classList.add("article");
    p.textContent = text;

    const button = document.createElement("button");
    button.textContent = "Delete task";
    button.classList.add("btn");

    li.appendChild(h2);
    li.appendChild(p);
    li.appendChild(button);
    return li;
  }
  const form = document.querySelector(".form");
  const inputTitle = document.querySelector(".inputTitle");
  const inputBody = document.querySelector(".inputBody");

  function onFormSubmit(event) {
    event.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!bodyValue || !titleValue || bodyValue === " " || titleValue === " ") {
      alert("Enter value");
    }

    const task = createNewTask(bodyValue, titleValue);
    const listItems = listItem(task);
    //fragment.appendChild(li);
    //list.appendChild(listItems);
    const list = document.querySelector(".list");
    list.insertAdjacentElement("afterbegin", listItems);

    function createNewTask(body, title) {
      const newTask = {
        title: title,
        text: body,
        completed: false,
        id: "task" + Math.random()
      };
      //console.log(newTask);
      objectOfTasks[newTask.id] = newTask;
      return { ...newTask };
    }
  }
  form.addEventListener("submit", onFormSubmit);
  renderAllTasks(objectOfTasks);
})(tasks);
