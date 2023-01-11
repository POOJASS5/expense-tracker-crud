// var form = document.getElementById("form");

var errormsg = document.querySelector(".msg");
// var list = document.querySelector("#users");
// const btn = document.querySelector("btn");

function save(event) {
  event.preventDefault();
  var amount = event.target.amount.value;
  var des = event.target.des.value;
  var select = event.target.expense.value;

  if (amount === "" || des === "" || select === "") {
    errormsg.classList.add("error");
    errormsg.innerHTML = "Please Enter all Fields";
    setTimeout(() => {
      errormsg.remove();
    }, 3000);
  }
  const obj = {
    amount,
    des,
    select,
  };

  axios
    .post(
      "https://crudcrud.com/api/245091aef7124382818d676ffe39d49d/addUsers",
      obj
    )
    .then((response) => {
      show(response.data);
      console.log(response);
    })
    .catch((err) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4> Something went wrong! </h4>";
      console.log(err);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/245091aef7124382818d676ffe39d49d/addUsers")
    .then((res) => {
      console.log(res);
      for (var i = 0; i < res.data.length; i++) {
        show(res.data[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function show(user) {
  document.getElementById("amount").value = "";
  document.getElementById("des").value = "";
  document.getElementById("expense").value = "";

  const parentNode = document.getElementById("users");
  const childHTML = `<li id=${user._id}> ${user.amount} - ${user.des} - ${user.select}
                          <button onclick=deleteUser('${user._id}') class=delete> Delete User </button>
                          <button onclick=editUser('${user.amount}','${user.des}','${user.select}','${user._id}') class=edit>Edit User </button>
                       </li>`;
  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function editUser(amount, des, select, userId) {
  document.getElementById("amount").value = name;
  document.getElementById("des").value = price;
  document.getElementById("expense").value = select;
  deleteUser(userId);
}

function deleteUser(userId) {
  axios
    .delete(
      `https://crudcrud.com/api/245091aef7124382818d676ffe39d49d/addUsers/${userId}`
    )
    .then((response) => {
      removeUserFromScreen(userId);
    })
    .catch((err) => {
      console.log(err);
    });
}

function removeUserFromScreen(userId) {
  const parentNode = document.getElementById("users");
  const childNodeToBeDeleted = document.getElementById(userId);
  parentNode.removeChild(childNodeToBeDeleted);
}