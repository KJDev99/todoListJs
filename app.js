let modal = document.querySelector(".modal");
let inputElements = document.querySelectorAll(".modal [name]");
let tasksDiv = document.querySelector(".tasks");
let statDiv = document.querySelector(".stat");
let tasks = [];

const render = (list) => {
  tasksDiv.innerHTML = "";
  let waiting = 0;
  let done = 0;
  let uy = 0;
  let ish = 0;
  let shaxsiy = 0;
  let boshqa = 0;

  list.forEach((item, index) => {
    if (item.status == 0) waiting++;
    if (item.status == 1) done++;

    switch (item.type) {
      case "uy":
        uy++;
        break;
      case "ish":
        ish++;
        break;
      case "shaxsiy":
        shaxsiy++;
        break;
      case "boshqa":
        boshqa++;
        break;
    }

    tasksDiv.innerHTML += `
        <div class="task ${item.status == 0 ? "waiting" : "done"}">
            <div class="title">${item.title}</div>
            <div class="text">${item.text}</div>
            <div class="bottom">
              <div class="dedline">${item.dedline}</div>
              <div class="type">${item.type}</div>
            </div>
            <div class="btns">
                <button onclick="changeStatus(${index})">Holat</button>
                <button onclick="deleteTask()" class="remove">O'chirish</button>
            </div>

        </div>
        `;
  });

  statDiv.innerHTML = `
    <h3>Barcha tasklar: ${list.length}</h3>
    <h3>Bajarilgan tasklar: ${done}</h3>
    <h3>Bajarilmagan tasklar: ${waiting}</h3>
    <h3>Shaxsiy tasklar: ${shaxsiy}</h3>
    <h3>Uy tasklar: ${uy}</h3>
    <h3>Ish tasklar: ${ish}</h3>
    <h3>Boshqa tasklar: ${boshqa}</h3>
    `;
};

const save = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render(tasks);
};

const deleteTask = (index) => {
  if (confirm("Qaroringiz qat`iymi?")) {
    tasks.splice(index, 1);
    save();
  }
};

const filterTasks = (status) => {
  render(
    status == "all" ? tasks : [...tasks.filter((task) => task.status == status)]
  );
};

const changeStatus = (index) => {
  tasks[index].status = tasks[index].status == 0 ? 1 : 0;
  save();
};

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  render(tasks);
}

const toggle = () => {
  modal.classList.toggle("open");
};

const add = () => {
  let task = {};
  inputElements.forEach((el) => {
    task[el.getAttribute("name")] = el.value;
    el.value = "";
  });
  task.status = 0;
  tasks.push(task);
  save();
  toggle();
  alert("Yangi topshiriq qo`shildi");
};
