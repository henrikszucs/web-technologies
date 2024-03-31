"use strict";
import Chart from "chart.js/auto";
import { getAquisitionsByYear, getDimensions } from "/api.js";

window.addEventListener("load", async function() {
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
        "type": 'bar',
        "data": {
            "labels": ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            "datasets": [
                {
                    "label": '# of Votes',
                    "data": [12, 19, 3, 5, 2, 3],
                    "borderWidth": 1
                },
                {
                    "label": '# of Votes',
                    "data": [12, 19, 3, 5, 2, 3].map(function(val) { return 2*val;}),
                    "borderWidth": 1
                }
            ]
        },
        "options": {
            "scales": {
                "y": {
                    "beginAtZero": true
                }
            }
        }
    });

    const ctx2 = document.getElementById("dimensions");
    const ctx3 = document.getElementById("acquisitions");
    const dataYear = await getAquisitionsByYear();
    new Chart(
        ctx3,
        {
            "type": 'bar',
            "data": {
                "labels": dataYear.map(row => row.year),
                "datasets": [
                    {
                        "label": 'Acquisitions by year',
                        "data": dataYear.map(row => row.count),
                    }
                ]
            }
        }
    );
});
