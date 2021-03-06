let tasks = [{
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

(function (arrTasks) {
  const objectOfTasks = arrTasks.reduce((acc, task) => {
    acc[task.id] = task;
    return acc;
  }, {});
  console.log("objectOfTasks", objectOfTasks);

  const themes = {
    default: {
      "--background": "white",
      "--text-color": "#6b96e7"
    },
    dark: {
      "--background": "#22243f",
      "--text-color": "white"
    }
  };
  const themeSelect = document.getElementById("theme-select");
  themeSelect.addEventListener("change", onThemeSelectChange);
  Object.entries(themes[themeSelect.value]).forEach(([key, value]) => {
    console.log(key, value);
    document.documentElement.style.setProperty(key, value);
    localStorage.setItem(key, value);
  });

  function onThemeSelectChange() {
    const selectedTheme = themeSelect.value;

    const isConfirm = confirm("are you sure?");
    if (!isConfirm) return;
    setTheme(selectedTheme);
  }

  function setTheme(name) {
    console.log(name);
    const selectedThemeObj = themes[name];
    console.log(Object.entries(selectedThemeObj));

    Object.entries(selectedThemeObj).forEach(([key, value]) => {
      console.log(key, value);
      document.documentElement.style.setProperty(key, value);
      localStorage.setItem(key, value);
    });
  }

  function renderAllTasks(taskList) {
    const fragment = document.createDocumentFragment();
    Object.values(taskList).forEach(task => {
      console.log(task);
      const li = listItem(task);
      fragment.appendChild(li);

      list.appendChild(fragment);
      //console.log(li);
    });
  }

  function listItem({
    id,
    title,
    text
  }) {
    //console.log(id, title, text);
    const li = document.createElement("li");
    li.classList.add("item");
    li.setAttribute("data-task-id", id);
    const h2 = document.createElement("h2");
    h2.classList.add("title");
    h2.textContent = title;

    const p = document.createElement("p");
    p.classList.add("article");
    p.textContent = text;


    const i = document.createElement('i');
    i.classList.add('fas');
    i.classList.add('fa-trash-alt');
    li.appendChild(h2);
    li.appendChild(p);
    li.appendChild(i);

    return li;
  }
  const form = document.querySelector(".form");
  const inputTitle = document.querySelector(".inputTitle");
  const inputBody = document.querySelector(".inputBody");
  const list = document.querySelector(".list");

  function onFormSubmit(event) {
    event.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!bodyValue || !titleValue || bodyValue === " " || titleValue === " ") {
      alert("Enter value");
      return null
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
      return {
        ...newTask
      };
    }
  }
  form.addEventListener("submit", onFormSubmit);
  renderAllTasks(objectOfTasks);

  function deleteTask(id) {
    const isConfirm = confirm(
      'Do you really wanna delete "' + objectOfTasks[id].title + '"?'
    );
    if (!isConfirm) {
      return isConfirm;
    } else {
      delete objectOfTasks[id];
      return isConfirm;
    }
  }

  function onDeleteHandler(event) {
    if (event.target.classList.contains("fas")) {
      const parent = event.target.closest("[data-task-id]");
      console.log("parent", parent);
      const id = parent.dataset.taskId;
      const confirm = deleteTask(id);
      if (!confirm) return;
      parent.remove();
    }
  }
  list.addEventListener("click", onDeleteHandler);
})(tasks);