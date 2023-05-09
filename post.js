const nameInput = document.getElementById("name-input");
const teamInput = document.getElementById("team-input");
const matchInput = document.getElementById("match-input");

const submitButton = document.getElementById("submit-button");
const scoutForm = document.getElementById("scout-form");

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
        if(autoChargeOutcomeSelect.value == "Engaged") {
            autoChargeEngage = "Yes";
        } else if(autoChargeOutcomeSelect.value == "Docked") {
            autoChargeDock = "Yes";
        }
        autoChargeAttemptOutput = "Yes";
    }

    var autoTechOutput = "No";
    if(autoTech) {
        autoTechOutput = "Yes";
    }

    data = {
        "Name": nameInput.value,
        "Team Number": teamInput.value,
        "Alliance": allianceSelect.value,
        "Match Number": matchInput.value,
        "Auto Placement": autoGridData,
        "Tele Placement": teleGridData,
        "Auto High": autoHigh,
        "Auto Mid": autoMid,
        "Auto Low": autoLow,
        "Auto Mobility": autoMobilityOutput,
        "Auto Charge Attempt": autoChargeAttemptOutput,
        "Auto Dock": autoChargeDock,
        "Auto Engage": autoChargeEngage,
        "Auto Tech": autoTechOutput,
    };

    var formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));

    e.preventDefault();

    console.log(formData);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            alert('Success!', response);
            switchSection(5, 0);
        })
        .catch(error => {
            alert('Terrible Error :(.', error.message);
            switchSection(5, 0);
        });
});