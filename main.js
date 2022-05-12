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

modalRegister.onclick = function (e) {
  e.stopPropagation();
};

// =====mobile nav====
const signUpMobile = $(".header_register-mobile");
const menuBtn = $(".header_menu-btn");
const modalMobile = $(".modal-mobile");
const menuMobile = $(".header_menu-mobile");
const closeMenuMobile = $(".header_menu-mobile i")

menuBtn.onclick = function () {
  modalMobile.classList.remove("hide");
  modalMobile.classList.add("show");

  menuMobile.classList.remove("hide");
  menuMobile.classList.add("show");
};

closeMenuMobile.onclick = function () {
  modalMobile.classList.remove("show");
  modalMobile.classList.add("hide");

  menuMobile.classList.remove("show");
  menuMobile.classList.add("hide");
}

menuMobile.onclick = function (e) {
  e.stopPropagation();
};

modalMobile.onclick = function () {
  modalMobile.classList.remove("show");
  modalMobile.classList.add("hide");

  menuMobile.classList.remove("show");
  menuMobile.classList.add("hide");
};

signUpMobile.onclick = function (e) {
  modal.classList.add("active");
  modalRegister.classList.add("active");
  
  modalMobile.classList.remove("show");
  modalMobile.classList.add("hide");
  
  e.preventDefault()

  closeBtn.addEventListener("click", function () {
    modal.classList.remove("active");
    modalRegister.classList.remove("active");

    menuMobile.classList.remove("show");
    menuMobile.classList.add("hide");
  });
}


