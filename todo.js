"use strict";

let todoList = document.querySelector("#todo-list");
let addButton = document.querySelector("#add-button");
let clearButton = document.querySelector("#clear-button");
let listArray = [];

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

let addItem = (() => {
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
    new_text.setAttribute("placeholder", "Type something ...")
    new_text.append("Testing");
    new_text.addEventListener("click", (e) => {e.stopPropagation();});

    new_textarea.append(new_text);
    new_button.append(new_checkbox, new_textarea);

    addButton.before(new_button);
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

    // Focus on next element or create new one
    new_text.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addItem();
    })

    new_text.focus();

    return {
        button: new_button,
        text: new_text,
    }
})

addButton.addEventListener("click", addItem)


// Cookies to save list.
function saveCookieList() {
    let s = "";
    for (let item of listArray) {
        s += item.querySelector("input").value;
        s += "&";
    }
    s = s.substring(0, s.length-1);
    document.cookie = `todoList=${encodeURIComponent(s)}; max-age=10000000`;
}

function getCookieList() {
    let all = document.cookie;
    all = decodeURIComponent(all);
    let list = all.split("; ");
    for (let cookie of list) {
        if (!cookie.includes("=")) continue;
        let p = cookie.indexOf("=");
        let name = cookie.substring(0, p);
        if (name != "todoList") continue;
        let list = cookie.substring(p+1);
        let items = list.split("&");
        for (let item of items) {
            if (item == "") continue;
            let todo_item = addItem();
            todo_item.text.value = item;
        }
        break;
    }
}

window.addEventListener("load", getCookieList);
window.addEventListener("beforeunload", saveCookieList);