const nameInput = document.getElementById("name-input");
const teamInput = document.getElementById("team-input");
const matchInput = document.getElementById("match-input");

const submitButton = document.getElementById("submit-button");

const scriptURL = "https://script.google.com/macros/s/AKfycbxvjcMX6YpTLHrYR0Zzh-BVKrY6Qt_5faizbVdJ4Z0GX_oqux_avbmJBHPYAZvu6ukxEw/exec";

submitButton.addEventListener('click', e => {
    data = {
        "Name": nameInput.value,
        "Team Number": teamInput.value,
        "Alliance": allianceSelect.value,
        "Match Number": matchInput.value,
    };

    var formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));

    e.preventDefault();

    console.log(formData);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            alert('Success!', response);
        })
        .catch(error => {
            alert('Error!', error.message);

        });
});