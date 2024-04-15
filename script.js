"use strict";

let todoList = document.querySelector("#todo-list");
let add_button = document.querySelector("#add-button")

function deleteParentItem(e) {
    e.target.parentNode.remove();
}

function focusText(e) {
    e.target.firstElementChild.focus();
}



function addButton() {
    console.log("triggered addButton");
    let svg_url = "http://www.w3.org/2000/svg";

    let new_button = document.createElement("li");
    new_button.classList.add("todo-item");

    let new_checkbox = document.createElementNS(svg_url, "svg");
    new_checkbox.setAttribute("viewBox", "0 0 100 100");
    new_checkbox.classList.add("item-check");
    new_checkbox.addEventListener("click", deleteParentItem);

    let square = document.createElementNS(svg_url, "rect");
    square.setAttribute("width", 80);
    square.setAttribute("height", 80);
    square.setAttribute("fill", "none");
    square.setAttribute("stroke", "white");
    square.setAttribute("stroke-width", "4");
    new_checkbox.append(square);

    let new_textarea = document.createElement("div");
    new_textarea.classList.add("item-textarea")
    new_textarea.addEventListener("click", focusText)

    let new_text = document.createElement("input");
    new_text.classList.add("item-text");
    new_text.append("Testing");
    new_text.addEventListener("click", (e) => {e.stopPropagation();});

    new_textarea.append(new_text);
    new_button.append(new_checkbox, new_textarea);

    add_button.before(new_button)
}

add_button.addEventListener("click", addButton)