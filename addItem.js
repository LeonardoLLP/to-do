"use strict";

function deleteParentItem(e) {
    let a = e.target.parentNode;
    if (a === undefined || a === e.target) {
        console.log("Checking again");
        a = e.target.parentNode;
    }
    if (a === undefined || a === e.target) {
        console.log("Can't erase target");
    }
    else a.remove();
}

function focusText(e) {
    e.target.firstElementChild.focus();
}

export default function addItem() {
    let todoList = document.querySelector("#todo-list");
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
    new_textarea.classList.add("item-textarea");
    new_textarea.addEventListener("click", focusText);

    let new_text = document.createElement("input");
    new_text.classList.add("item-text");
    new_text.setAttribute("placeholder", "Type something ...");
    new_text.append("Testing");
    new_text.addEventListener("click", (e) => { e.stopPropagation(); });

    new_textarea.append(new_text);
    new_button.append(new_checkbox, new_textarea);

    todoList.append(new_button);

    // Focus on next element or create new one
    new_text.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addItem();
    });

    new_text.focus();

    return {
        button: new_button,
        text: new_text,
    };
};