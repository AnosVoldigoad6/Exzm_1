let tbody = document.querySelector(".tbody");
let search = document.querySelector(".search");
let sort = document.querySelector(".sort");
let formAdd = document.querySelector(".formAdd");
let dialog = document.querySelector(".dialog");
let clos = document.querySelector(".clos");
let btnAdd = document.querySelector(".btnAdd");
let editForm = document.querySelector(".editForm");
let closes = document.querySelector(".closes");
let dial = document.querySelector(".dial");

const api = "http://localhost:3000/api/data";

async function getData() {
  try {
    const response = await fetch(api);
    const data = await response.json();
    get(data);
  } catch (error) {
    console.log(error);
  }
}
getData();

function get(data) {
  tbody.innerHTML = "";

  data.forEach((el) => {
    let tr = document.createElement("tr");
    tr.classList.add("tr1");

    let td1 = document.createElement("td");

    let newbar = document.createElement("div");
    newbar.classList.add("newbar");

    let img = document.createElement("img");
    img.classList.add("ava");
    img.src = el.avatar;

    let name = document.createElement("h2");
    name.classList.add("name");
    name.innerHTML = el.name;

    let td2 = document.createElement("td");

    let adress = document.createElement("p");
    adress.classList.add("adress");
    adress.innerHTML = el.adress;

    let td3 = document.createElement("td");

    let status = document.createElement("p");

    if (el.status == true) {
      status.innerHTML = "Active";
      status.classList.add("active");
    } else {
      status.innerHTML = "Inactive";
      status.classList.add("inactive");
    }

    let td4 = document.createElement("td");

    let editBtn = document.createElement("button");
    editBtn.classList.add("btnEdit");
    editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
</svg>`;

    editBtn.onclick = () => {
      editUser(el);
    };

    let deletBtn = document.createElement("button");
    deletBtn.classList.add("btnDelet");
    deletBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>`;

    deletBtn.onclick = () => {
      deletUser(el.id);
    };

    let chek = document.createElement("input");
    chek.classList.add("chek");
    chek.type = "checkbox";
    chek.checked = el.status;

    chek.onclick = () => {
      el.status = !el.status;
      isComplit(el.id, el);
    };

    newbar.append(img, name);
    td1.append(newbar);
    td2.append(adress);
    td3.append(status);
    td4.append(editBtn, deletBtn, chek);
    tr.append(td1, td2, td3, td4);
    tbody.appendChild(tr);
  });
}

// function search

search.oninput = async () => {
  try {
    const response = await fetch(`${api}?q=${search.value}`);
    const data = await response.json();
    get(data);
  } catch (error) {
    console.log(error);
  }
};

// function sort

sort.onclick = async () => {
  try {
    const response = await fetch(`${api}?_sort=name`);
    const data = await response.json();
    get(data);
  } catch (error) {
    console.log(error);
  }
};

// function isComplit

async function isComplit(id, user) {
  try {
    const response = await fetch(`${api}/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    getData(user);
  } catch (error) {
    console.log(error);
  }
}

// function addUser

async function addUser(user) {
  try {
    const response = await fetch(`${api}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    getData();
  } catch (error) {
    console.log(error);
  }
}

formAdd.onsubmit = async (event) => {
  event.preventDefault();

  let user = {
    avatar: formAdd["name1"].value,
    name: formAdd["name2"].value,
    adress: formAdd["name3"].value,
    status: false,
  };

  addUser(user);
  dialog.close();
  formAdd.reset();
};

btnAdd.onclick = () => {
  dialog.showModal();
  clos.onclick = () => {
    dialog.close();
  };
};

// function deletUser

async function deletUser(id) {
  try {
    const response = await fetch(`${api}/${id}`, {
      method: "DELETE",
    });
    getData();
  } catch (error) {
    console.log(error);
  }
}

// function editUser

async function editUser(el) {
  dial.showModal();
  editForm["name4"].value = el.avatar;
  editForm["name5"].value = el.name;
  editForm["name6"].value = el.adress;

  editForm.onsubmit = async (event) => {
    event.preventDefault();

    let user = {
      avatar: editForm["name4"].value,
      name: editForm["name5"].value,
      adress: editForm["name6"].value,
      status: false,
    };

    try {
      const response = await fetch(`${api}/${el.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      getData();
      dial.close();
    } catch (error) {
      console.log(error);
    }
  };
}

closes.onclick = () => {
  dial.close();
};
