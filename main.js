const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const modal = $(".modal");
// const modalLogin = $(".modal .modal_login");
const modalRegister = $(".modal_register");
const closeBtn = $(".modal i");

// const loginBtn = $(".header_login");
// loginBtn.addEventListener("click", function () {
//   modal.classList.add("active");
//   modalLogin.classList.add("active");

//   closeBtn.addEventListener("click", function () {
//     modal.classList.remove("active");
//     modalLogin.classList.remove("active");
//   });
// });

const regisBtn = ($(".header_register").onclick = function () {
  modal.classList.add("active");
  modalRegister.classList.add("active");

  closeBtn.addEventListener("click", function () {
        modal.classList.remove("active");
        modalRegister.classList.remove("active");
      });
});

modal.addEventListener("click", function () {
    modal.classList.remove("active");
});

modalRegister.onclick = function(e) {
    e.stopPropagation()
}
