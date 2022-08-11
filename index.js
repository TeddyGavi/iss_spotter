const fetch = require("./iss");

/* fetch.fetchMyIP((error, ip) => {
  if (error) {
    console.log(`It didn't work! ${error}`);
    return;
  }
    
  
  console.log(`It worked! Returned IP: ${ip}`);
  
  
}); */

/*  fetch.fetchCoordsByIP('75.156.127.200', (error, coordinates) => {
   if (error) {
    console.log(`It didn't work! ${error}`);
    return;
   }

   console.log('It worked! Returned coordinates:', coordinates)
 })

//  75.156.127.200 */


// { latitude: 49.7016339, longitude: -123.1558121 }

// fetch.fetchISSFlyOverTimes({ latitude: 49.7016339, longitude: -123.1558121 }, (error, flyOver) => {
//   if (error) {
//     console.log(`It didn't work! ${error}`);
//     return;
//   }

//   console.log(`It worked! ISS Fly Over Times`, flyOver);
// });

const print = (array) => {
  for (const x of array) {
    const date = new Date(0);
    date.setUTCSeconds(x.risetime);
    const seconds = x.duration;
    console.log(`Next pass at ${date} for ${seconds} seconds!`);
  }
};

fetch.nextISSTimesForMyLocation((error, flyOver) => {
  if (error) {
    console.log(`It didn't work ${error}`);
    return;
  }

  print(flyOver);
});