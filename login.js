//Validator Object
function Validator(options) {
    function getParent(element, selector) {
      while (element.parentElement) {
        if (element.parentElement.matches(selector)) {
          return element.parentElement;
        }
        element = element.parentElement;
      }
    }
  
    var selectorRules = {};
  
    //Hàm báo message lỗi
    function validate(inputElement, rule) {
      var errorElement = getParent(
        inputElement,
        options.formGroupSelector
      ).querySelector(options.errorSelector);
      var errorMessage;
  
      //lấy ra các rule của selector
      var rules = selectorRules[rule.selector];
  
      //lặp qua từng rule và kiểm tra , nếu mà có lỗi thì dừng việc ktra
      for (var i = 0; i < rules.length; ++i) {
        switch (inputElement.type) {
          case "radio":
          case "checkbox":
            errorMessage = rules[i](
              formElement.querySelector(rule.selector + ":checked")
            );
            break;
          default:
            errorMessage = rules[i](inputElement.value);
        }
  
        if (errorMessage) break;
      }
  
      if (errorMessage) {
        errorElement.innerText = errorMessage;
        getParent(inputElement, options.formGroupSelector).classList.add(
          "invalid"
        );
      } else {
        errorElement.innerText = "";
        getParent(inputElement, options.formGroupSelector).classList.remove(
          "invalid"
        );
      }
  
      return !errorMessage;
    }
  
    // lấy Element của form
    var formElement = document.querySelector(options.form);
    if (formElement) {
      //khi click nút submit
      formElement.onsubmit = function (e) {
        e.preventDefault();
  
        var isFormValid = true;
  
        //lặp qua từng rule và thực hiện validate
        options.rules.forEach(function (rule) {
          var inputElement = formElement.querySelector(rule.selector);
          var isValid = validate(inputElement, rule);
          if (!isValid) {
            isFormValid = false;
          }
        });
  
        //Lấy ra data user nhập vào
        if (isFormValid) {
          //trường hợp submit vs code javascript
          if (typeof options.onSubmit === "function") {
            var enableInputs = formElement.querySelectorAll("[name]");
            var formValues = Array.from(enableInputs).reduce(function (
              values,
              input
            ) {
              switch (input.type) {
                case "radio":
                  values[input.name] = formElement.querySelector(
                    'input[name="' + input.name + '"]:checked'
                  ).value;
                  break;
                case "checkbox":
                case "checkbox":
                  if (!Array.isArray(values[input.name])) values[input.name] = [];
                  if (input.matches(":checked"))
                    values[input.name].push(input.value);
                  break;
                case "file":
                  values[input.name] = input.files;
                  break;
                default:
                  values[input.name] = input.value;
              }
              return values;
            },
            {});
  
            options.onSubmit(formValues);
          }
          //trường hợp sử dụng submit mặc định của html
          else {
            formElement.submit();
          }
        }
      };
  
      options.rules.forEach(function (rule) {
        //Lưu lại các rules cho mỗi input
        if (Array.isArray(selectorRules[rule.selector])) {
          selectorRules[rule.selector].push(rule.test);
        } else {
          selectorRules[rule.selector] = [rule.test];
        }
  
        var inputElements = formElement.querySelectorAll(rule.selector);
  
        Array.from(inputElements).forEach(function (inputElement) {
          //xử lí trường hợp blur ra khỏi ô input
          inputElement.onblur = function () {
            validate(inputElement, rule);
          };
  
          //xử lí khi user đang nhập
          inputElement.oninput = function () {
            var errorElement = getParent(
              inputElement,
              options.formGroupSelector
            ).querySelector(options.errorSelector);
            errorElement.innerText = "";
            getParent(inputElement, options.formGroupSelector).classList.remove(
              "invalid"
            );
          };
        });
      });
    }
  }
  
  //định nghĩa rules
  Validator.isRequired = function (selector) {
    return {
      selector: selector,
      test: function (value) {
        return value ? undefined : "Please enter !";
      },
    };
  };
  
  Validator.isEmail = function (selector) {
    return {
      selector: selector,
      test: function (value) {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(value) ? undefined : "Please enter your email !";
      },
    };
  };
  Validator.minLength = function (selector, min) {
    return {
      selector: selector,
      test: function (value) {
        return value.length >= min
          ? undefined
          : `Please enter at least ${min} characters !`;
      },
    };
  };
  
  Validator.isConfirmed = function (selector, confirmPassword) {
    return {
      selector: selector,
      test: function (value) {
        return value === confirmPassword()
          ? undefined
          : "Mật khẩu không trùng khớp";
      },
    };
  };
  
  Validator({
    form: "#form_login",
    formGroupSelector: ".form_group",
    errorSelector: ".form-message",
    rules: [
      Validator.isRequired("#user"),
      Validator.isEmail("#user"),
      Validator.minLength("#pass", 6),
    ],
    onSubmit: function (data) {
      console.log(data);
    },
  });
  
  