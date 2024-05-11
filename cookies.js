"use strict";

//TODO: Export addItem from todo and import it here.

let todoList = document.querySelector("#todo-list");

// Cookies to save list.
function saveCookieList() {
    let s = "";
    for (let item of listArray) {
        s += item.querySelector("input").value;
        s += "&";
    }
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
