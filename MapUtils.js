import axios from 'axios';

const getCoordinates = async (address) => {
    const formattedAddress = `${address} Station NSW`; // Format the address
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(formattedAddress)}&key=AIzaSyAkZbzGPsazEWPON7AMN1IF9PQ7ZgyIPAM`;
    try {
        const response = await axios.get(url);
        const coords = response.data.results[0].geometry.location;
        return coords;
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
};

const calculateDistance = async (origin, destination) => {
    const originCoords = await getCoordinates(`${origin} Station NSW`);
    const destinationCoords = await getCoordinates(`${destination} Station NSW`);
    if (!originCoords || !destinationCoords) {
        console.error('Unable to locate one of the addresses.');
        return null;
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originCoords.lat},${originCoords.lng}&destinations=${destinationCoords.lat},${destinationCoords.lng}&key=AIzaSyAkZbzGPsazEWPON7AMN1IF9PQ7ZgyIPAM`;

    try {
        const response = await axios.get(url);
        const results = response.data.rows[0].elements[0];
        return {
            distance: results.distance.text,
            duration: results.duration.text,
        };
    } catch (error) {
        console.error('Error calculating distance:', error);
        return null;
    }
};


const getMap = async (origin, destination, travelMode = 'transit') => {
    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=${travelMode}&key=AIzaSyAkZbzGPsazEWPON7AMN1IF9PQ7ZgyIPAM`;
  
    try {
      const response = await axios.get(directionsUrl);
      const data = response.data;
      if (data.status === 'OK') {
        return data;
      } else {
        throw new Error(data.error_message || 'Failed to retrieve directions.');
      }
    } catch (error) {
      console.error('getMap error:', error);
      throw error;
    }
  };

  const getWeatherForecast = async (location) => {
    const apiKey = '8731765d42244c91bc9112839241604';  // Replace with your actual API key
    // Append ", NSW, Australia" to ensure the location query is specific to New South Wales, Australia
    const formattedLocation = `${location}, NSW, Australia`;
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(formattedLocation)}&days=3&aqi=yes&alerts=yes`;

    try {
        const response = await axios.get(url);
        return response.data;  // This will return the complete forecast object
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;  // Optionally re-throw to handle the error outside this function
    }
};



const fetchSuburbs = async () => {
    const url = 'https://wl3fywkj02.execute-api.ap-southeast-2.amazonaws.com/prod/data-collection/suburbs';
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching suburbs:', error);
        return null;
    }
};

const fetchWeatherAnalytics = async (suburb, startDate, endDate, attributes) => {
    const params = {
        suburb,
        startDate,
        endDate,
        attributes
    };
    const url = 'https://wl3fywkj02.execute-api.ap-southeast-2.amazonaws.com/prod/data-analytics/analyse';
    try {
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather analytics:', error);
        return null;
    }
};

export { getCoordinates, calculateDistance, getMap, getWeatherForecast, fetchSuburbs, fetchWeatherAnalytics };
