import openSocket from 'socket.io-client';
const socket = openSocket('http://wkwin6368400:3051');
// create a function that can be called to emit the subscribeToTimer event to the server and feed back the results of the timer event to the consuming code.


export function subscribeToLiveMarket(cb) {
  socket.on('liveMarket', (timestamp,data )=> cb(null, timestamp,data));
 
}
