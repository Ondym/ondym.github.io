// let formWrapper = document.querySelector('.form-wrapper');
let form = document.createElement('form');
form.setAttribute('method', 'GET');
form.setAttribute('action', 'form.php');

let formTitle = document.createElement('div');
formTitle.className = "form-header";
formTitle.innerText += "Dotazník:";
form.appendChild(formTitle);

// ABOUT USER

let ageLabel = createLabel('age', 'Věk:');
let ageInput = createInput('number', 'age', 'age', 'Zadejte svůj věk', true);
ageInput.setAttribute("max", 99);
ageInput.setAttribute("min", 5);
form.appendChild(ageLabel);
form.appendChild(ageInput);

let genderLabel = createLabel('gender', 'Pohlaví:');
let genderSelect = createSelect('gender', 'gender', true, [
    { value: '', text: 'Vyberte své pohlaví', disabled: true, selected: true },
    { value: 'male', text: 'Muž' },
    { value: 'female', text: 'Žena' },
]);
form.appendChild(genderLabel);
form.appendChild(genderSelect);

let playGamesLabel = createLabel('play-games', 'Hrajete videohry?');
let yesRadio = createRadio('yes', 'play_games', 'yes', 'Ano', true);
let noRadio = createRadio('no', 'play_games', 'no', 'Ne');
playGamesLabel.appendChild(yesRadio);
playGamesLabel.appendChild(noRadio);
form.appendChild(playGamesLabel);

// ABOUT VIDEOGAMES

let gamesForm = document.createElement('div');
gamesForm.id = "gamesSection";

let lineSpan = document.createElement("span");
lineSpan.className = "line";
gamesForm.appendChild(lineSpan);

let howOftenLabel = createLabel("how-often", "Jak často hrajete videohry?");
[
    createOption("more-than-two",        "how-often", 1, "Více než 2h denně"),
    createOption("less-than-two",        "how-often", 2, "Každý den, méně než 2h"),
    createOption("every-week",           "how-often", 3, "Každý týden"),
    createOption("every-month",          "how-often", 4, "Párkrát za měsíc"),
    createOption("less-than-every-month","how-often", 5, "Méně než párkrát za měsíc")
].forEach(function (option) {
    howOftenLabel.appendChild(createRadio(option.id, option.name, option.value, option.text));
});
gamesForm.appendChild(howOftenLabel);

form.appendChild(gamesForm);

let submitButton = createInput('submit', 'submit', 'submit', 'Přejít k testu reflexů', false);
form.appendChild(submitButton);

function postSetup() {
    document.getElementsByName("play_games").forEach(radio => {
        let gamesForm = document.getElementById("gamesSection");
        radio.addEventListener("change", function (e) {
            if (e.target.id == "yes") {
                gamesForm.className = "";
            } else {
                gamesForm.className = "hide";
            }
        });
    });
}