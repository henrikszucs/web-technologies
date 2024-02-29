"use strict";




window.addEventListener("load", function () {
    //No.1 Offline/Online status
    let status = document.querySelector(".status");
    let statusText = document.querySelector(".status span:nth-child(1)");
    let statusIcon = document.querySelector(".status span:nth-child(2)");
    window.addEventListener("online", function() {
        status.style.color = "green";
        statusText.textContent = "You are connected to internet";
        statusIcon.textContent = "cloud_on";
    });
    window.addEventListener("offline", function() {
        status.style.color = "red";
        statusText.textContent = "You are not connected to internet";
        statusIcon.textContent = "cloud_off";
    });
    window.dispatchEvent(new Event("online"));


    //No.2 resize window
    let resize = document.querySelector(".resize");
    let lastCall = 0;
    function reportWindowSize() {
        resize.textContent = "Window size is: " + window.innerWidth + " x " + window.innerHeight;
        resize.style.color = "red";
        resize.style.animation = null; 
        lastCall = Date.now();
        setTimeout(function() {
            if (lastCall+100 <= Date.now()) {
                resize.style.color = "initial";
            }
        }, 100);
        
        
    }
    window.onresize = reportWindowSize;
    reportWindowSize();


    //No.3 resize div
    let interactive = document.querySelector(".interactive");
    new ResizeObserver(function(event) {
        interactive.style.backgroundColor = "hsl(" + (interactive.offsetWidth % 800) + ", 100%, 80%)";
    }).observe(interactive);


    //No.4 follow scroll
    let container = document.querySelector(".interactive div");
    let lastScrollPercentage = 0;
    let ticking = false;
    interactive.addEventListener("scroll", function(event) {
        console.log()
        lastScrollPercentage = (event.target.scrollTop + event.target.offsetHeight) / event.target.scrollHeight * 100;
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(() => {
                let size = 48 + (lastScrollPercentage / 100 * 40);
                container.style.background = "linear-gradient(135deg, #9296dd55 25%, transparent 25%) -" + (size/2) + "px 0/ " + (size) + "px " + (size) + "px, linear-gradient(225deg, #9296dd 25%, transparent 25%) -" + (size/2) + "px 0/ " + (size) + "px " + (size) + "px, linear-gradient(315deg, #9296dd55 25%, transparent 25%) 0px 0/ " + (size) + "px " + (size) + "px, linear-gradient(45deg, #9296dd 25%, rgba(99, 99, 115, 0) 25%) 0px 0/ " + (size) + "px " + (size) + "px";
                ticking = false;
            });
        }
    });
    interactive.dispatchEvent(new Event("scroll"));


    //No.5 follow mouse
    let mouseEl = null;
    interactive.addEventListener("mouseenter", function() {
        try {
            mouseEl.remove();
        } catch (error) {}
        mouseEl = document.createElement("span");
        mouseEl.classList.add("material-icons");
        mouseEl.style.position = "absolute";
        mouseEl.style.top = "0";
        mouseEl.style.left = "0";
        mouseEl.innerText = "arrow_upward";
        interactive.appendChild(mouseEl);
    });
    interactive.addEventListener("mousemove", function(event) {
        mouseEl.style.top = (event.clientY + 20) + "px";
        mouseEl.style.left = (event.clientX - 5) + "px"
    });
    interactive.addEventListener("mouseleave", function(event) {
        try {
            mouseEl.remove();
        } catch (error) {}
    });

    

    //No.5 select text
    let textEl = document.querySelector(".interactive div p:nth-child(1)");
    let msgEl = document.querySelector(".interactive div p:nth-child(2)");
    const getCopiedData = async function() {
        // Get pasted data via clipboard API
        try {
            let text = await navigator.clipboard.readText();
            msgEl.innerText = "You copied the following text: \"" +text + "\"";
        } catch (error) {
            msgEl.innerText = "I cannot read your clipboard!";
        }
    }
    textEl.addEventListener("copy", getCopiedData);
    textEl.addEventListener("cut", getCopiedData);
});