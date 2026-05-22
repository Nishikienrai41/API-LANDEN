let button = document.getElementById("submitBtn");
let input = document.getElementById("landnaam");
let results = document.getElementById("results");

async function getData() {
    try {
        let response = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags");

        if (!response.ok) {
            throw new Error("Er is iets fout gegaan met de API.");
        }

        let data = await response.json();
        return data;

    } catch (error) {
        results.innerHTML = "<p>Er is een fout gebeurd bij het ophalen van de landen.</p>";
        return [];
    }
}

function filterData(zoekterm, data) {
    return data.filter(land =>
        land.name.common.toLowerCase().includes(zoekterm.toLowerCase())
    );
}

function showData(landen) {
    results.innerHTML = "";

    if (landen.length === 0) {
        results.innerHTML = "<p>Niets gevonden.</p>";
        return;
    }

    landen.forEach(land => {
        let div = document.createElement("div");

        let naam = document.createElement("h3");
        naam.textContent = land.name.common;

        let hoofdstad = document.createElement("p");
        hoofdstad.textContent = "Hoofdstad: " + (land.capital ? land.capital[0] : "Geen hoofdstad");

        let vlag = document.createElement("img");
        vlag.src = land.flags.png;
        vlag.alt = "Vlag van " + land.name.common;
        vlag.width = 100;

        div.appendChild(naam);
        div.appendChild(hoofdstad);
        div.appendChild(vlag);

        results.appendChild(div);
    });
}

async function zoekLand() {
    let zoekterm = input.value.trim();

    results.innerHTML = "";

    if (zoekterm.length === 0) {
        results.innerHTML = "<p>Typ eerst een landnaam.</p>";
        return;
    }

    let landenData = await getData();
    let gefilterdeData = filterData(zoekterm, landenData);

    showData(gefilterdeData);
}

button.addEventListener("click", zoekLand);

input.addEventListener("input", zoekLand);