// ==============================
// HTML-elementen ophalen
// ==============================

// De knop met id="submitBtn" opslaan in de variabele button
let button = document.getElementById("submitBtn");

// Het inputveld met id="landnaam" opslaan in de variabele input
let input = document.getElementById("landnaam");

// De div waarin resultaten getoond worden opslaan
let results = document.getElementById("results");


// ==============================
// Functie om data van de API op te halen
// ==============================

// async betekent dat deze functie wacht op internetdata
async function getData() {

    // try probeert de code uit te voeren
    try {

        // fetch haalt data op van de REST Countries API
        // await wacht tot de data binnenkomt
        let response = await fetch(
            "https://restcountries.com/v3.1/all?fields=name,capital,flags"
        );

        // Controle of de aanvraag gelukt is
        // response.ok is false als de API fout geeft
        if (!response.ok) {

            // Zelf een fout maken
            throw new Error("Er is iets fout gegaan met de API.");
        }

        // De JSON-data omzetten naar een JavaScript-array/object
        let data = await response.json();

        // De data terugsturen
        return data;

    } catch (error) {

        // Als er een fout gebeurt:
        // toon foutmelding op de pagina
        results.innerHTML =
            "<p>Er is een fout gebeurd bij het ophalen van de landen.</p>";

        // Geef een lege array terug zodat de code niet crasht
        return [];
    }
}


// ==============================
// Functie om landen te filteren
// ==============================

// zoekterm = wat gebruiker heeft getypt
// data = alle landen van de API
function filterData(zoekterm, data) {

    // filter() loopt door alle landen
    // Alleen landen die overeenkomen worden teruggegeven
    return data.filter(land =>

        // land.name.common = naam van het land
        // toLowerCase() maakt alles kleine letters
        // includes() controleert of de zoekterm voorkomt in de naam
        land.name.common
            .toLowerCase()
            .includes(zoekterm.toLowerCase())
    );
}


// ==============================
// Functie om resultaten te tonen
// ==============================

function showData(landen) {

    // Eerst oude resultaten verwijderen
    results.innerHTML = "";

    // Controle of er landen gevonden zijn
    if (landen.length === 0) {

        // Bericht tonen als niets gevonden is
        results.innerHTML = "<p>Niets gevonden.</p>";

        // Stop de functie
        return;
    }

    // Loop door elk gevonden land
    landen.forEach(land => {

        // Nieuwe div maken voor elk land
        let div = document.createElement("div");


        // ==============================
        // Naam van het land maken
        // ==============================

        // h3-element maken
        let naam = document.createElement("h3");

        // Tekst toevoegen aan h3
        naam.textContent = land.name.common;


        // ==============================
        // Hoofdstad maken
        // ==============================

        // p-element maken
        let hoofdstad = document.createElement("p");

        // Controle of het land een hoofdstad heeft
        // ? betekent: als waar
        // : betekent: anders
        hoofdstad.textContent =
            "Hoofdstad: " +
            (land.capital
                ? land.capital[0]
                : "Geen hoofdstad");


        // ==============================
        // Vlag maken
        // ==============================

        // img-element maken
        let vlag = document.createElement("img");

        // Bron van afbeelding instellen
        vlag.src = land.flags.png;

        // Alternatieve tekst instellen
        vlag.alt = "Vlag van " + land.name.common;

        // Breedte van afbeelding instellen
        vlag.width = 100;


        // ==============================
        // Alles toevoegen aan de div
        // ==============================

        // Naam toevoegen aan div
        div.appendChild(naam);

        // Hoofdstad toevoegen aan div
        div.appendChild(hoofdstad);

        // Vlag toevoegen aan div
        div.appendChild(vlag);


        // ==============================
        // Div tonen op de pagina
        // ==============================

        results.appendChild(div);
    });
}


// ==============================
// Hoofdfunctie voor zoeken
// ==============================

// async omdat we wachten op API-data
async function zoekLand() {

    // De tekst uit het inputveld ophalen
    // trim() verwijdert spaties voor en achter
    let zoekterm = input.value.trim();

    // Oude resultaten leegmaken
    results.innerHTML = "";

    // Controle of gebruiker iets heeft ingevuld
    if (zoekterm.length === 0) {

        // Bericht tonen als input leeg is
        results.innerHTML = "<p>Typ eerst een landnaam.</p>";

        // Stop de functie
        return;
    }

    // ==============================
    // Data ophalen van API
    // ==============================

    let landenData = await getData();


    // ==============================
    // Landen filteren
    // ==============================

    let gefilterdeData =
        filterData(zoekterm, landenData);


    // ==============================
    // Resultaten tonen
    // ==============================

    showData(gefilterdeData);
}


// ==============================
// Event listeners
// ==============================

// Als gebruiker op knop klikt:
// voer zoekLand() uit
button.addEventListener("click", zoekLand);


// Als gebruiker typt in inputveld:
// automatisch zoeken uitvoeren
input.addEventListener("input", zoekLand);