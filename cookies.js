"use strict";

import addItem from "./addItem.js"

// Cookies to save list.
function saveCookieList() {
    let todoList = document.querySelector("#todo-list");
    let s = "";
    for (let child of todoList.children) {
        s += child.querySelector("input").value;
        s += "&";
    }
    console.log("s=" + s);

    s = s.substring(0, s.length - 1);
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
        let list = cookie.substring(p + 1);
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
