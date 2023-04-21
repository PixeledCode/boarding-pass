export async function getAirport(code: string) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_RapidAPI,
      'X-RapidAPI-Host': 'airport-info.p.rapidapi.com',
    },
  };

  return fetch(
    `https://airport-info.p.rapidapi.com/airport?iata=${code}`,
    options
  )
    .then((response) => response.json())
    .then((response) => response.city)
    .catch((err) => console.error(err));
}

export async function getAirlineName(code: string) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_RapidAPI,
      'X-RapidAPI-Host': 'airlines-by-api-ninjas.p.rapidapi.com',
    },
  };

  return fetch(
    `https://airlines-by-api-ninjas.p.rapidapi.com/v1/airlines?iata=${code}`,
    options
  )
    .then((response) => response.json())
    .then((response) => response[0])
    .catch((err) => console.error(err));
}

export async function getBarCodeImage(rawValue: string) {
  const symbologyURL = `https://bwipjs-api.metafloor.com/?bcid=azteccode&text=${rawValue}&scale=4`;
  return fetch(symbologyURL)
    .then((res) => res.blob())
    .then((myBlob) => {
      return myBlob;
    });
}

export const fetchFlightDetails = async (flightCode: string) => {
  const url = `https://airlabs.co/api/v9/flight?flight_iata=${flightCode}&api_key=${
    import.meta.env.VITE_AIR_API
  }`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
