const nameInput = document.getElementById("name-input");
const teamInput = document.getElementById("team-input");
const matchInput = document.getElementById("match-input");

const submitButton = document.getElementById("submit-button");
const scoutForm = document.getElementById("scout-form");

const autoChargeOutput = document.getElementById("auto-charge");

const scriptURL = "https://script.google.com/macros/s/AKfycbzk1w9sYekFbdUre5kaGVnjtnqSVr9PpHrCgfFvb261u_gFfUMPgPSh1UDR3WAFzFxbpw/exec";

const respectInducingImages = ["img/sherril5.png", "img/trompmil24.png", "img/sherril.png", "img/snow.png"];

scoutForm.addEventListener('submit', e => {
    document.getElementById("respect-your-elders-image").src = respectInducingImages[Math.round(Math.random() * (respectInducingImages.length-1))];

    console.log('y');

    var autoHigh = 0;
    var autoMid = 0;
    var autoLow = 0;

    for(var i = 0; i < autoGridData.length; i++){
        if(i % 9>= 6 && autoGridData[i] != 0) {
            autoHigh ++;
        }
    }

    for(var i = 0; i < autoGridData.length; i++){
        if(i % 9 < 6 && i % 9 > 2 && autoGridData[i] != 0) {
            autoMid ++;
        }
    }

    for(var i = 0; i < autoGridData.length; i++){
        if(i % 9 <= 2 && autoGridData[i] != 0) {
            autoLow ++;
        }
    }
    console.log(autoLow);

    var autoMobilityOutput = "No";
    if(autoMobility) {
        autoMobilityOutput = "Yes";
    }

    var autoChargeAttemptOutput = "No";
    var autoChargeDock = "No";
    var autoChargeEngage = "No";
    if(autoCharge) {
        if(autoChargeOutput.value == "Engaged") {
            autoChargeEngage = "Yes";
        } else if(autoChargeOutput.value == "Docked") {
            autoChargeDock = "Yes";
        }
        autoChargeAttemptOutput = "Yes";
    }

    var autoTechOutput = "No";
    if(autoTech) {
        autoTechOutput = "Yes";
    }

    var teleHigh = 0;
    var teleMid = 0;
    var teleLow = 0;

    for(var i = 0; i < teleGridData.length; i++){
        if(i % 9>= 6 && teleGridData[i] != 0) {
            teleHigh ++;
        }
    }

    for(var i = 0; i < teleGridData.length; i++){
        if(i % 9 < 6 && i % 9 > 2 && teleGridData[i] != 0) {
            teleMid ++;
        }
    }

    for(var i = 0; i < teleGridData.length; i++){
        if(i % 9 <= 2 && teleGridData[i] != 0) {
            teleLow ++;
        }
    }

    var teleParkOutput = "No";
    if(telePark) {
        teleParkOutput = "Yes";
    }

    var teleChargeAttemptOutput = "No";
    var teleChargeDock = "No";
    var teleChargeEngage = "No";
    if(teleCharge) {
        if(teleChargeOutcomeSelect.value == "Engaged") {
            teleChargeEngage = "Yes";
        } else if(teleChargeOutcomeSelect.value == "Docked") {
            teleChargeDock = "Yes";
        }
        teleChargeAttemptOutput = "Yes";
    }

    var teleTechOutput = "No";
    if(teleTech) {
        teleTechOutput = "Yes";
    }

    var teleCommsOutput = "No";
    if(teleComms) {
        teleCommsOutput = "Yes";
    }

    var teleDisabledOutput = "No";
    if(teleDisabled) {
        teleDisabledOutput = "Yes";
    }
    
    var autoPoints = 0;
    autoPoints = (autoHigh * 6) + (autoMid * 4) + (autoLow * 3);
    if(autoMobility) {
        autoPoints += 3;
    }
    if(autoChargeEngage == "Yes") {
        autoPoints += 12;
    } else if(autoChargeDock == "Yes") {
        autoPoints += 8;
    }
    if(autoTech) {
        autoPoints -= 10;
    }
    console.log(autoPoints);


    // TELE VALUES

    var teleTechOutput = "No";
    if(teleTech) {
        teleTechOutput = "Yes";
    }

    var teleFlipOutput = "No";
    if(teleFlip) {
        teleFlipOutput = "Yes";
    }

    var dumbOutput = "No";
    if(dumb) {
        dumbOutput = "Yes";
    }

    var recklessOutput = "No";
    if(reckless) {
        recklessOutput = "Yes";
    }

    var telePoints = 0;
    telePoints = (teleHigh * 5) + (teleMid * 3) + (teleLow * 2);

    if(teleChargeEngage == "Yes") {
        telePoints += 10;
    } else if(teleChargeDock == "Yes") {
        telePoints += 6;
    } else if(telePark) {
        telePoints += 2;
    }
    if(teleTech) {
        telePoints -= 10;
    }
    console.log(telePoints);

    var commentsOutput = document.getElementById("comments-area").value;

    data = {
        "Name": nameInput.value,
        "Team Number": teamInput.value,
        "Alliance": allianceSelect.value,
        "Match Number": matchInput.value,
        "Auto Placement": autoGridData,
        "Auto Points": autoPoints,
        "Tele Placement": teleGridData,
        "Tele Points": telePoints,
        "Auto High": autoHigh,
        "Auto Mid": autoMid,
        "Auto Low": autoLow,
        "Auto Mobility": autoMobilityOutput,
        "Auto Charge Attempt": autoChargeAttemptOutput,
        "Auto Dock": autoChargeDock,
        "Auto Engage": autoChargeEngage,
        "Auto Tech": autoTechOutput,
        "Tele High": teleHigh,
        "Tele Mid": teleMid,
        "Tele Low": teleLow,
        "Endgame Park": teleParkOutput,
        "Tele Dock": teleChargeDock,
        "Tele Engage": teleChargeEngage,
        "Tele Tech": teleTechOutput,
        "Flip": teleFlipOutput,
        "Lost Comms": teleCommsOutput,
        "Disabled": teleDisabledOutput,
        "Poor Decisions/Unintelligent": dumbOutput,
        "Reckless": recklessOutput,
        "Comments": commentsOutput
    };

    var formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));

    e.preventDefault();

    console.log(formData);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            alert('Success!', response);
            switchSection(5, 0);
            resetForm();
        })
        .catch(error => {
            alert('Terrible Error :(.', error.message);
            switchSection(5, 0);
            resetForm();
        });
});

function resetForm() {
    teamInput.value = "";
    matchInput.value = "";
    teleCharge = false;
    teleFlip = false;
    dumb = false;
    reckless = false;
    teleTech = false;
    autoCharge = false;
    autoTech = false;
    teleComms = false;
    teleDisabled = false;
    telePark = false;
    autoMobility = false;
    var checks = document.getElementsByClassName("check");
    for(var i = 0; i < checks.length; i ++) {
        checks[i].style.backgroundColor = "rgb(93, 94, 95)";
    }
}