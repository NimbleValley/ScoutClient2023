function enterFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();     // Firefox
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();  // Safari
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();      // IE/Edge
    }
};

enterFullScreen(window);

var tl = new TimelineMax();

const sections = document.getElementsByClassName("section");
for (var i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
}
sections[0].style.display = "flex";



const allianceSelect = document.getElementById("alliance-select");



const gridContainer = document.getElementById("grid-container");
for (var s = 0; s < 3; s++) {
    var tempSection = document.createElement("div");
    tempSection.className = "grid-section";
    if (s == 1) {
        tempSection.style.backgroundColor = "rgb(78, 74, 74)";
    }
    for (var r = 0; r < 3; r++) {
        var tempRow = document.createElement("div");
        tempRow.className = "grid-row-auto";
        for (var n = 0; n < 3; n++) {
            var tempNode = document.createElement("div");
            tempNode.className = "grid-node-auto";
            tempNode.classList.add(0);
            tempNode.id = (s * 9) + (r * 3) + (n);
            tempNode.onclick = function () { setAutoNode(this.id) }
            tempRow.appendChild(tempNode);
        }
        tempSection.appendChild(tempRow);
    }
    gridContainer.appendChild(tempSection);
}
var grids = document.getElementsByClassName("grid-container-full");
var autoGridData = [];



const teleGridContainer = document.getElementById("tele-grid-container");
/*for (var s = 0; s < 3; s++) {
    var tempSection = document.createElement("div");
    tempSection.className = "grid-section";
    if (s == 1) {
        tempSection.style.backgroundColor = "rgb(78, 74, 74)";
    }
    for (var r = 0; r < 3; r++) {
        var tempRow = document.createElement("div");
        tempRow.className = "grid-row";
        for (var n = 0; n < 3; n++) {
            var tempNode = document.createElement("grid-node");
            tempNode.className = "grid-node-tele";
            tempNode.classList.add(0);
            tempNode.id = (s * 9) + (r * 3) + (n);
            tempNode.onclick = function () { setAutoNode(this.id) }
            tempRow.appendChild(tempNode);
        }
        tempSection.appendChild(tempRow);
    }
    teleGridContainer.appendChild(tempSection);
}*/
var teleGridData = [];

for (var i = 0; i < 27; i++) {
    autoGridData[i] = 0;
}

for (var i = 0; i < 27; i++) {
    teleGridData[i] = 0;
}



var autoMobility = false;
const autoMobilityCheck = document.getElementById("auto-mobility-check");



var autoTech = false;
const autoTechCheck = document.getElementById("auto-tech-check");


var autoCharge = false;
const autoChargeCheck = document.getElementById("auto-charge-check");
const autoChargeOutcomeSelect = document.getElementById("auto-charge");
autoChargeOutcomeSelect.style.display = "none";



async function switchSection(current, next) {
    window.scroll({
        top: 0,
        left: 0
    });

    if (next > current) {
        tl.to(sections[current], { transform: "translate(-50vw, -50vh) scale(0.5) rotate(-45deg)", opacity: 0, duration: 0.5, ease: "power2" });
    } else {
        tl.to(sections[current], { transform: "translate(50vw, 50vh) scale(0.5) rotate(45deg)", opacity: 0, duration: 0.5, ease: "power2" });
    }

    sections[next].style.display = "flex";

    if (next > current) {
        tl.fromTo(sections[next], { transform: "translate(50vw, 50vh) scale(0.5) rotate(45deg)", opacity: 0 }, { transform: "", opacity: 1, duration: 0.5, ease: "power2" }, "-=0.35");
    } else {
        tl.fromTo(sections[next], { transform: "translate(-50vw, -50vh) scale(0.5) rotate(-45deg)", opacity: 0 }, { transform: "", opacity: 1, duration: 0.5, ease: "power2" }, "-=0.35");
    }
    await sleep(500);
    sections[current].style.display = "none";
}

function setAutoNode(id) {
    var node = document.getElementsByClassName("grid-node-auto")[id];
    if (id == 0 || id == 1 || id == 2 || id == 9 || id == 10 || id == 11 || id == 18 || id == 19 || id == 20) {
        autoGridData[id] = autoGridData[id] + 1;
        if (autoGridData[id] > 2) {
            autoGridData[id] = 0;
        }

        if (autoGridData[id] == 1) {
            node.style.backgroundColor = "#6643DA";
        } else if (autoGridData[id] == 2) {
            node.style.backgroundColor = "#FDC955";
        } else {
            node.style.backgroundColor = "rgb(196, 190, 184)";
        }
    } else {
        if (autoGridData[id] == 0) {
            if ((id + 2) % 3 == 0) {
                autoGridData[id] = 1;
                node.style.backgroundColor = "#6643DA";
            } else {
                autoGridData[id] = 2;
                node.style.backgroundColor = "#FDC955";
            }
        } else {
            autoGridData[id] = 0;
            node.style.backgroundColor = "rgb(196, 190, 184)";
        }
    }
    tl.to(node, { scale: 1.25, duration: 0.15, ease: "power2" });
    tl.to(node, { scale: 1, duration: 0.15, ease: "power2" });
}

function setTeleNode(id) {
    var node = document.getElementsByClassName("grid-node-tele")[id];
    if (id == 0 || id == 1 || id == 2 || id == 9 || id == 10 || id == 11 || id == 18 || id == 19 || id == 20) {
        teleGridData[id] = teleGridData[id] + 1;
        if (teleGridData[id] > 2) {
            teleGridData[id] = 0;
        }

        if (teleGridData[id] == 1) {
            node.style.backgroundColor = "#6643DA";
        } else if (teleGridData[id] == 2) {
            node.style.backgroundColor = "#FDC955";
        } else {
            node.style.backgroundColor = "rgb(196, 190, 184)";
        }
    } else {
        if (teleGridData[id] == 0) {
            if ((id + 2) % 3 == 0) {
                teleGridData[id] = 1;
                node.style.backgroundColor = "#6643DA";
            } else {
                teleGridData[id] = 2;
                node.style.backgroundColor = "#FDC955";
            }
        } else {
            teleGridData[id] = 0;
            node.style.backgroundColor = "rgb(196, 190, 184)";
        }
    }
    tl.to(node, { scale: 1.25, duration: 0.15, ease: "power2" });
    tl.to(node, { scale: 1, duration: 0.15, ease: "power2" });
}

function setUpTeleGrid() {
    console.log(autoGridData);
    teleGridContainer.innerHTML = "";
    for (var s = 0; s < 3; s++) {
        var tempSection = document.createElement("div");
        tempSection.className = "grid-section";
        if (s == 1) {
            tempSection.style.backgroundColor = "rgb(78, 74, 74)";
        }
        for (var r = 0; r < 3; r++) {
            var tempRow = document.createElement("div");
            tempRow.className = "grid-row";
            for (var n = 0; n < 3; n++) {
                var tempNode = document.createElement("div");
                tempNode.className = "grid-node-tele";
                tempNode.classList.add(0);
                tempNode.id = (s * 9) + (r * 3) + (n);
                if (autoGridData[(s * 9) + (r * 3) + (n)] != 0) {
                    tempNode.style.border = "orangered solid 1.5vw";
                    if(autoGridData[(s * 9) + (r * 3) + (n)] == 1) {
                        tempNode.style.backgroundColor = "#6643DA";
                    } else {
                        tempNode.style.backgroundColor = "#FDC955";
                    }
                } else {
                    tempNode.onclick = function () { setTeleNode(this.id) }
                }
                tempRow.appendChild(tempNode);
            }
            tempSection.appendChild(tempRow);
        }
        teleGridContainer.appendChild(tempSection);
    }
}

allianceSelect.addEventListener("change", function () {
    if (document.getElementById("alliance-select").value.substring(0, 1) == "R") {
        for (var i = 0; i < grids.length; i++) {
            grids[0].style.transform = "rotate(180deg)";
        }
    } else {
        for (var i = 0; i < grids.length; i++) {
            grids[0].style.transform = "rotate(0deg)";
        }
    }
});

autoMobilityCheck.addEventListener("click", function () {
    autoMobility = !autoMobility;
    var checkbox = document.getElementById("auto-mobility-checkbox");

    if (autoMobility) {
        checkbox.style.backgroundColor = "#6feb36";
        tl.to(checkbox, { scale: 1.25, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
    } else {
        checkbox.style.backgroundColor = "rgb(93, 94, 95)";
        tl.to(checkbox, { scale: 0.75, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
    }
});

autoTechCheck.addEventListener("click", function () {
    autoTech = !autoTech;
    var checkbox = document.getElementById("auto-tech-checkbox");

    if (autoTech) {
        checkbox.style.backgroundColor = "#6feb36";
        tl.to(checkbox, { scale: 1.25, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
    } else {
        checkbox.style.backgroundColor = "rgb(93, 94, 95)";
        tl.to(checkbox, { scale: 0.75, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
    }
});

autoChargeCheck.addEventListener("click", async function () {
    autoCharge = !autoCharge;
    var checkbox = document.getElementById("auto-charge-checkbox");

    if (autoCharge) {
        checkbox.style.backgroundColor = "#6feb36";
        tl.to(checkbox, { scale: 1.25, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });

        autoChargeOutcomeSelect.style.display = "flex";
        tl.fromTo(autoChargeOutcomeSelect, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "power2" });
    } else {
        checkbox.style.backgroundColor = "rgb(93, 94, 95)";
        tl.to(checkbox, { scale: 0.75, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });

        tl.fromTo(autoChargeOutcomeSelect, { scale: 1, opacity: 1 }, { scale: 0, opacity: 0, duration: 0.5, ease: "power2" });

        await sleep(500);
        autoChargeOutcomeSelect.style.display = "none";
    }
});

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
