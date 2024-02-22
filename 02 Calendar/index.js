"use strict";

const HourStrToNum = function(str) {
    const arr = str.split(":");
    return parseInt(arr[0]) * 60 + parseInt(arr[1]);
};

const addEvent = function(dayIndex, startTimeStr, endTimeStr, label) {
    let dayVal = dayIndex;
    let startVal = HourStrToNum(startTimeStr);
    let endVal = HourStrToNum(endTimeStr);
    let labelVal = label;

    if (startVal > endVal) {
        const s = startVal;
        startVal = endVal;
        endVal = s;
    }
    startVal = Math.max(startVal, 7 * 60);
    endVal = Math.min(endVal, 20 * 60);

    startVal -= 7 * 60;
    endVal -= 7 * 60;

    startVal = startVal / 60 / 13 * 100;
    endVal = 100 - endVal / 60 / 13 * 100;

    const newSpan = document.createElement("span");
    newSpan.classList.add("event");
    newSpan.style.top = startVal + "%";
    newSpan.style.bottom = endVal + "%";
    newSpan.innerText = labelVal;

    const el = document.querySelector(".schedule table:nth-child(2) tbody tr td:nth-child(" + (dayVal + 2) + ") div");
    el.appendChild(newSpan);
}

window.addEventListener("load", function () {
    const dayEl = document.getElementById("days");
    const startEl = document.getElementById("start");
    const endEl = document.getElementById("end");
    const labelEl = document.getElementById("label");
    const addEl = document.getElementById("add");

    {
        let curDate = new Date(Date.now());

        const dayIdx = [6, 0, 1, 2, 3, 4, 5];
        dayEl.selectedIndex = dayIdx[curDate.getDay()];

        startEl.value = curDate.getHours().toString().padStart(2, '0') + ":" + curDate.getMinutes().toString().padStart(2, '0');

        curDate = new Date(Date.now() + 1000 * 3600);
        endEl.value = curDate.getHours() + ":" + curDate.getMinutes();
    };

    addEvent(0, "12:00", "13:50", "Machine learning");
    addEvent(0, "14:00", "15:35", "Machine learning");
    addEvent(0, "15:40", "17:15", "Cloud Computing");
    addEvent(0, "17:20", "18:55", "Cloud Computing");

    addEvent(1, "12:10", "13:50", "Numerical methods for differential equations");
    addEvent(1, "14:00", "15:35", "Numerical methods for differential equations");

    addEvent(3, "08:30", "10:10", "Web technologies");
    addEvent(3, "10:20", "12:00", "Web technologies");

    addEvent(3, "14:50", "16:25", "High performance computing");
    addEvent(3, "16:30", "18:05", "High performance computing");

    addEl.addEventListener("click", function() {
        addEvent(dayEl.selectedIndex, startEl.value, endEl.value, labelEl.value);
    });
});