"use strict";
import addItem from "./addItem.js";
import clearList from "./clearList.js";

let addButton = document.querySelector("#add-button");
addButton.addEventListener("click", addItem);

let clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", clearList);
