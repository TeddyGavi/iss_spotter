const fetch = require("./iss_promised")

// fetch.fetchMyIP()
//   .then(fetch.fetchCoordsByIP)
//   .then(fetch.fetchISSFlyOverTimes)
//   .then(body => console.log(body))
  
const print = (array) => {
  for (const x of array) {
    const date = new Date(0);
    date.setUTCSeconds(x.risetime);
    const seconds = x.duration;
    console.log(`Next pass at ${date} for ${seconds} seconds!`);
  }
};


fetch.nextISSTimesForMyLocation()
  .then((flyOver) => {
    print(flyOver);
  })
  .catch((error) => {
    console.log("It didn't work!: ", error.message);
  })