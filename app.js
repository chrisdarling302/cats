// petfinder api - 9IlicRCCU9TLIzmLGeHxHm47WMhhRAzyS2h3ImFFaQoTWiTmHF
// petfinder secret - qlpng3u5H0rOZ6jTbeon4iHkODowPZkCZaUSE93n
// curl -d "grant_type=client_credentials&client_id={CLIENT-ID}&client_secret={CLIENT-SECRET}" https://api.petfinder.com/v2/oauth2/token
// request structure - curl -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" GET https://api.petfinder.com/v2/{CATEGORY}/{ACTION}?{parameter_1}={value_1}&{parameter_2}={value_2}
// get a single animal type - GET https://api.petfinder.com/v2/types/{type}

API_KEY = "9IlicRCCU9TLIzmLGeHxHm47WMhhRAzyS2h3ImFFaQoTWiTmHF";
SECRET = "qlpng3u5H0rOZ6jTbeon4iHkODowPZkCZaUSE93n";

const searchButton = document.querySelector(".search__btn");
const searchInput = document.querySelector(".search__input");

async function getAccessToken() {
  const response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
    method: "POST",
    body: `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${SECRET}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const data = await response.json();
  console.log(data);
  return data.access_token;
}

async function fetchAnimals() {
  const types = searchInput.value;
  const token = await getAccessToken();
  const response = await fetch(
    `https://api.petfinder.com/v2/animals?types=${types}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const animalData = await response.json();
  console.log("Animal data:", animalData);
}

searchButton.addEventListener("click", fetchAnimals);