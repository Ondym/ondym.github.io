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
playGamesLabel.appendChild(
    createMultipleChoice([
        createOption('yes', 'yes', 'Ano'),
        createOption('no', 'no', 'Ne')
    ], "play-games", "radio"));
form.appendChild(playGamesLabel);

// ABOUT VIDEOGAMES

let gamesForm = document.createElement('div');
gamesForm.id = "gamesSection";
gamesForm.className = "hide";

let lineSpan = document.createElement("span");
lineSpan.className = "line";
gamesForm.appendChild(lineSpan);

let howOftenLabel = createLabel("how-often", "Jak často hrajete videohry?");

howOftenLabel.appendChild(
    createMultipleChoice([
        createOption("more-than-two", 1, "Více než 2h denně"),
        createOption("less-than-two", 2, "Každý den, méně než 2h"),
        createOption("every-week", 3, "Každý týden"),
        createOption("every-month", 4, "Párkrát za měsíc"),
        createOption("less-than-every-month", 5, "Méně než párkrát za měsíc")
    ], "how-often", "radio"));
    gamesForm.appendChild(howOftenLabel);

let whatKindLabel = createLabel("what-kind", "Jaké typy her hrajete nejčastěji?");
    
whatKindLabel.appendChild(
    createMultipleChoice([
        createOption("strategic", 1, "Strategické"),
        createOption("shooting", 2, "Střílecí"),
        createOption("building", 3, "Budovací"),
        createOption("sport", 4, "Sportovní"),
        createOption("sandobox", 5, "Sandboxové"),
        createOption("platform", 6, "Platformové"),
        createOption("other", 7, "Jiné")
    ], "what-kind", "checkbox"));
gamesForm.appendChild(whatKindLabel);

let gamesOnline = createLabel('online-games', 'Hrajete videohry spíše online, nebo offline?');
gamesOnline.appendChild(
    createMultipleChoice([
        createOption('online', 'offline', 'Online'),
        createOption('offline', 'online', 'Offline'),
    ], "online-games", "radio"));

gamesForm.appendChild(gamesOnline);
    
form.appendChild(gamesForm);

let submitButton = createInput('submit', 'submit', 'submit', 'Přejít k testu reflexů', false);
form.appendChild(submitButton);

function postSetup() {
    document.getElementsByName("play-games").forEach(radio => {
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