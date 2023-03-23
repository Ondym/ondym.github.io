// let formWrapper = document.querySelector('.form-wrapper');
let form = document.createElement('form');
form.setAttribute('id', 'main-formular');
form.setAttribute('action', 'form.php');
form.setAttribute('method', 'POST');

let formTitle = document.createElement('div');
formTitle.className = "form-header only-mobile";
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
    { value: 'muž', text: 'Muž' },
    { value: 'žena', text: 'Žena' },
]);
form.appendChild(genderLabel);
form.appendChild(genderSelect);

let playGamesLabel = createLabel('plays-games', 'Hrajete videohry?');
playGamesLabel.appendChild(
    createMultipleChoice([
        createOption('yes', "ANO", 'Ano'),
        createOption('no', "NE", 'Ne')
    ], "plays-games", "radio"));
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
        createOption("more-than-two", "Více než 2h denně", "Více než 2h denně"),
        createOption("less-than-two", "Méně než 2h denně", "Každý den, méně než 2h"),
        createOption("every-week", "Týdně", "Každý týden"),
        createOption("every-month", "Mesíčně", "Párkrát za měsíc"),
        createOption("less-than-every-month", "Málo", "Méně než párkrát za měsíc")
    ], "how-often", "radio"));
gamesForm.appendChild(howOftenLabel);

let whatKindLabel = createLabel("what-kind", "Jaké typy her hrajete nejčastěji?");

whatKindLabel.appendChild(
    createMultipleChoice([
        createOption("strategic","1, ", "Strategické"),
        createOption("shooting", "2, ", "Střílecí"),
        createOption("building", "3, ", "Budovací"),
        createOption("sport",    "4, ", "Sportovní"),
        createOption("sandobox", "5, ", "Sandboxové"),
        createOption("platform", "6, ", "Platformové"),
        createOption("other",    "7, ", "Jiné")
    ], "what-kind[]", "checkbox"));
gamesForm.appendChild(whatKindLabel);

let gamesOnline = createLabel('online-games', 'Hrajete videohry spíše online, nebo offline?');
gamesOnline.appendChild(
    createMultipleChoice([
        createOption('online', 'offline', 'Online'),
        createOption('offline', 'online', 'Offline'),
    ], "online-games", "radio"));

gamesForm.appendChild(gamesOnline);

form.appendChild(gamesForm);


let resultInput = createInput('text', 'reflexes', 'reflexes', 'XXXXXXXX', true);
resultInput.style.display = "none";
resultInput.style.opacity = 0;
form.appendChild(resultInput);

let submitButton = createInput('submit', 'submit', 'submit', 'Přejít k testu reflexů', false);
form.appendChild(submitButton);

function postSetup() {
    /*setTimeout(() => {
        let reklama = document.getElementsByTagName("div");
        reklama = reklama[reklama.length-3];
        reklama.style.display = "none";
    }, 20);*/
    document.getElementsByName("plays-games").forEach(radio => {
        let gamesForm = document.getElementById("gamesSection");
        radio.addEventListener("change", function (e) {
            if (e.target.id == "yes") {
                gamesForm.className = "";
            } else {
                gamesForm.className = "hide";
            }
        });
    });

    document.getElementById("begin-test").addEventListener("click", function (e) {
        let invalid = document.getElementById("age").value == "";
        invalid = invalid || document.getElementById("gender").value == "";
        invalid = invalid || !(document.getElementById("yes").checked || document.getElementById("no").checked);
        if (document.getElementById("yes").checked) {
            let partValid = false;
            document.getElementsByName("how-often").forEach(function(box) {
                partValid = partValid || box.checked;
            });
            partValid = false;
            document.getElementsByName("what-kind[]").forEach(function(box) {
                partValid = partValid || box.checked;
            });
            invalid = invalid || !partValid;
            invalid = invalid || !(document.getElementById("online").checked || document.getElementById("offline").checked);
        }
        if (invalid) {
            alert("Před spuštěním testu prosím vyplňte celý dotazník ");
            return;
        }
        e.target.parentElement.style.display = "none";
    });
    document.getElementById("test-explaining").addEventListener("click", function () {
        beginTest();
    });
    document.getElementById("clickable-block").addEventListener("click", function () {
        blockClicked();
    });
    resultInput = document.getElementById("reflexes");
}