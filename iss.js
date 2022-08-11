/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require("request");


const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API

  request('https://api.ipify.org?format=json', (error, response, body) => {
  
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP, Response ${body}`;
      callback(Error(msg), null);
      return;

    } else {
      const data = JSON.parse(body).ip;
      callback(null, data);
      // console.log(typeof data)
      // return data;
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {

  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } else {

      const data = JSON.parse(body);

      if (!data.success) {
        const msg = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
        callback(Error(msg), null);
        return;
      }
      const { latitude, longitude } = data;
      callback(null, { latitude, longitude });

    }
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  // ...
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, res, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    //check statusCode and return error if not a success, via a callback
    if (res.statusCode !== 200) {
      const msg = `Your request yielded a ${res.statusCode} status code`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    // const { response } = data
    //if the received message doesn't display a success, log that as an error
    if (data.message !== 'success') {
      const msg = `The HTTP request was a success but the query of, ${body} failed`;
      callback(Error(msg), null);
      return;
    }

    //if everything checks, then display the response array
    callback(null,  data.response);

  });
};
 

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(Error(`It didn't work! ${error}`), null);
      return;
    }
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        callback(Error(`It didn't work! ${error}`), null);
        return;
      }
      fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
        if (error) {
          callback(Error(`It didn't work! ${error}`), null);
          return;
        }
        callback(null, passTimes);
      });
    });
  
  });
};




module.exports = {

  //  fetchMyIP,
  // fetchCoordsByIP,
  // fetchISSFlyOverTimes,
  nextISSTimesForMyLocation

};
