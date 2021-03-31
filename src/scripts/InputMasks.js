function dateMask(d) {
  return [
    {
      length: [1, 2],
      regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
      placeholder: "mm",
    },
    { fixed: "/" },
    {
      length: [1, 2],
      regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
      placeholder: "dd",
    },
    { fixed: "/" },
    {
      length: 4,
      regexp: /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
      placeholder: "yyyy",
    },
  ];
}

function phoneNumberMask() {
  return [
    { fixed: "(" },
    {
      length: 3,
      regexp: /^[0-9]{1,3}$/,
      placeholder: "xxx",
    },
    { fixed: ")" },
    { fixed: " " },
    {
      length: 3,
      regexp: /^[0-9]{1,3}$/,
      placeholder: "xxx",
    },
    { fixed: "-" },
    {
      length: 4,
      regexp: /^[0-9]{1,4}$/,
      placeholder: "xxxx",
    },
  ];
}

function nameMask() {
  return [
    {
      regexp: /^[A-z']*$/,
      placeholder: "John",
    },
    { fixed: " " },
    {
      regexp: /^[A-z']*$/,
      placeholder: "Doe",
    },
    { regexp: /^( [A-z']*)*$/ },
  ];
}

function emailMask() {
  return [
    {
      regexp: /^[A-z0-9\.-]*$/,
    },
    { fixed: "@" },
    {
      regexp: /^([A-z0-9\-])*$/,
    },
    {
      regexp: /^(\.[A-z0-9]*)*$/,
    },
  ];
}

const validationMasks = {
  phone: {
    regexp: /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/,
    message: "Invalid Phone Number",
    status: "error",
  },
  email: {
    regexp: /^[A-z0-9\.-]*@([A-z0-9\-])*(\.[A-z0-9]*)*$/,
    message: "Invalid Email",
    status: "error",
  },
  name: {
    regexp: /^[A-z']* [A-z']*( [A-z']*)*$/,
    message: "Please Enter Full Name",
    status: "error",
  },
  date: (value) => {
    let ar = value.split("/");
    if (ar.length != 3) {
      return { message: "Invalid Date", status: "error" };
    } else {
      let month = ar[0],
        day = ar[1],
        year = ar[2];
      if (
        year < new Date().getFullYear() - 100 ||
        year > new Date().getFullYear()
      ) {
        return { message: "Year invalid", status: "error" };
      }
      if ([4, 6, 9, 11].includes(parseInt(month)) && parseInt(day) == 31) {
        return { message: "Date Does not exist.", status: "error" };
      } else {
        if (parseInt(month) == 2 && parseInt(day) > 28) {
          return { message: "Date Does not exist.", status: "error" };
        } else {
          return;
        }
      }
    }
  },
};

export { dateMask, phoneNumberMask, nameMask, emailMask, validationMasks };
