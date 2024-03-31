"use strict";
import Chart from "chart.js/auto";

const dataGen = function(from, to, step, func, decimals=2) {
    const xArr = [];
    const yArr = [];
    if (from > to) {
        const s = from;
        from = to;
        to = s;
    }
    for (let x = from; x < to; x+=step) {
        xArr.push(Math.round(x*(10**decimals)) / (10**decimals));
        yArr.push(eval(func));
    }
    return [xArr, yArr];
}



window.addEventListener("load", function() {
    const exprEl = document.getElementById("expr");
    let myChart = null;
    exprEl.addEventListener("change", function(event) {
        let expr = event.target.value;
        let data = [];
        try {
            data = dataGen(0, Math.PI*4, 0.1, expr);
        } catch (error) {
            data = dataGen(0, 1, 0.1, "1");
            expr += " CANNOT EVAULATE!!"
        }
        
        myChart?.destroy();
        myChart = new Chart(document.getElementById("function"), {
            "type": "line",
            "data": {
                "labels": data[0],
                "datasets": [
                    {
                        "label": expr,
                        "data": data[1],
                        "borderWidth": 1
                    }
                ]
            }
        });
    });
    exprEl.dispatchEvent(new Event("change"));
});
