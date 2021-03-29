function dateMask(d) {
  return [
    {
      length: [1, 2],
      //   options: Array.from({ length: 12 }, (v, k) => k + 1),
      regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
      placeholder: "mm",
    },
    { fixed: "/" },
    {
      length: [1, 2],
      //   options: Array.from(
      //     {
      //       length: new Date(2019, parseInt(d.split('/')[0], 10), 0).getDate(),
      //     },
      //     (v, k) => k + 1,
      //   ),
      regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
      placeholder: "dd",
    },
    { fixed: "/" },
    {
      length: 4,
      //   options: Array.from({ length: 100 }, (v, k) => 2019 - k),
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
export { dateMask, phoneNumberMask, nameMask, emailMask };
