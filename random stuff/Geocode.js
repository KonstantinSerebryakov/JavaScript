const fetch = require("node-fetch");

function fetchGeocode(city) {
    if (typeof city !== "string") {
        throw TypeError();
    }

    const geocodeAPIkey = "427340201614518325803x83428";
    const base = "http://geocode.xyz/";

    const url = new URL(city, base);
    url.searchParams.append("json", "1");
    url.searchParams.append("auth", geocodeAPIkey);

    return fetch(url.toString());
}

function displayCities() {
    const cities = ["Minsk", "Madrid", "Rome"];

    cities.forEach((city) => {
        if (typeof city !== "string") {
            throw TypeError();
        }

        fetchGeocode(city).then(async (response) => {
            if (response.status !== 200) {
                throw Error();
            }

            const data = await response.json();

            const city = data.standard.city;
            const countryname = data.standard.countryname;
            console.log(`${city}-${countryname}`);
        });
    })
}

function displayRacedFetchedCities() {
    const cities = ["Paris", "Nice"];

    const promises = [];
    cities.forEach((city) => {
        if (typeof city !== "string") {
            throw TypeError();
        }

        promises.push(fetchGeocode(city).then(async (response) => {
            if (response.status !== 200) {
                throw Error();
            }

            const data = await response.json();

            return data.standard.countryname;
        }));
    });

    Promise.race(promises).then((country) => {
        if (typeof country !== "string") {
            throw TypeError();
        }

        console.log(country);
    })
}

function getDelayedCitiesNames() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 3000, ["Minsk", "Madrid", "Rome", "Paris", "Nice"])
    })
}

function displayCitiesCountries() {
    getDelayedCitiesNames().then((cities) => {
        if (!cities || !Array.isArray(cities)) {
            throw TypeError();
        }

        cities.forEach((city) => {
            if (typeof city !== "string") {
                throw TypeError();
            }

            fetchGeocode(city).then(async (response) => {
                if (response.status !== 200) {
                    throw Error();
                }

                const data = await response.json();

                console.log(data.standard.countryname);
            });
        });
    });
}

// displayCities()
// displayRacedFetchedCities();
// displayCitiesCountries();
