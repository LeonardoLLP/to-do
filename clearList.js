"use strict";

export default function clearList() {
    console.log("Clearing list");
    let todoList = document.querySelector("#todo-list");
    while (todoList.children.length > 0) todoList.firstElementChild.remove();
}