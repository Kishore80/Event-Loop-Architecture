//To add CB in Close queue , We can use events that listen to close methods

const fs = require('fs');

let readableStream = fs.createReadStream(__dirname);
readableStream.close()

readableStream.on('close',()=>{
    console.log('This is a Close Queue CB')
})


Promise.resolve().then(()=>{
    console.log("This is a Promise Callback")
})

setTimeout(()=>{
    console.log("This is a Timer Callback")
},0);


process.nextTick(()=>{
    console.log("This is Next Tick Callback")
})


setImmediate(()=>{
    console.log("This is a Check Callback")
})

/*

This is very clear from our understanding on Event Loop and it's execution order

This is Next Tick Callback
This is a Promise Callback
This is a Timer Callback
This is a Check Callback
This is a Close Queue CB

The Close CB is executed after Microtask queue , Timer Queue , I/O Queue , Check Queue

*/