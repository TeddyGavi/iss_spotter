const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');

}

const fetchCoordsByIP = (body) => {
  const parseIP = JSON.parse(body).ip;
  return request(`http://ipwho.is/${parseIP}`);
}

const fetchISSFlyOverTimes = (body) => {
  const { latitude, longitude } = JSON.parse(body);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const { response } = JSON.parse(body);
      return response;
    })
}

module.exports = {
  //  fetchMyIP,
  //  fetchCoordsByIP,
  //  fetchISSFlyOverTimes
  nextISSTimesForMyLocation,
}