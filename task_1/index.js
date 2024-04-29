/** @format */

import { encoded, translations } from "./data.js";

// Задание 1

const myfunc = (encoded, translations) => {
  let mydata = [];

  for (const item of encoded) {
    let myobject = {};

    for (const obj in item) {
      if (obj.slice(-2) === "Id" && translations[item[obj]] !== undefined) {
        if (item[obj] !== "0") myobject[obj] = translations[item[obj]];
      } else {
        if ((obj === "mpmId" || obj === "budgetId") && item[obj] === null) {
          continue;
        }
        myobject[obj] = item[obj];
      }
    }

    mydata.push(myobject);
  }

  return mydata;
};

// уникальные id

const unicalid = (myfunclog) => {
  let unicalidcode = [];

  for (const item of myfunclog) {
    for (const key in item) {
      const type = item[key];
      if ((typeof type === "number" || +type) && type !== "") {
        const mytype = +type;
        if (!unicalidcode.includes(mytype)) {
          unicalidcode.push(mytype);
        }
      }
    }
  }

  return unicalidcode;
};

const myfunclog = myfunc(encoded, translations);
console.log(myfunclog);

const unicalidlog = unicalid(myfunclog);
console.log(unicalidlog);
