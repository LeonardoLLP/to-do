"use strict";

let todoList = document.querySelector("#todo-list");
let button_add = document.querySelector("#add-button")

function deleteParentItem(e) {
    let a = e.target.parentNode;
    if (a === undefined || a === e.target) {
        console.log("Checking again");
        a = e.target.parentNode;
    }
    if (a === undefined) {
        console.log("Can't erase target");
    }
    else a.remove();
}

function focusText(e) {
    e.target.firstElementChild.focus();
}

let addButton = (() => {
    let listArray = [];
    return function() {
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

        button_add.before(new_button);
        listArray.push(new_button);

        // Delete element from array
        new_checkbox.addEventListener("click", (e) => {
            let i = listArray.indexOf(new_button);
            if (i > -1) {
                console.log(`removing index ${i}`);
                listArray.splice(i, 1);
            }
            else console.log("Not removing anything");
            console.log("Final array:");
            console.log(listArray);
        })
    }
})()

button_add.addEventListener("click", addButton)