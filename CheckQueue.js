//To add callback to checkqueue , we can use setImmediate

const fs = require('fs');

fs.readFile(__filename,()=>{
    console.log("This is a I/O callback")
    setImmediate(()=>{
        console.log("This is a Check Callback")
    })
})

process.nextTick(()=>{
    console.log("This is Next Tick Callback")
})

Promise.resolve().then(()=>{
    console.log("This is a Promise Callback")
})

setTimeout(()=>{
    console.log("This is a Timer Callback")
},0);


for (let index = 0; index < 2000000000; index++) {}

/*

Unlike I/O Polling , We are placing the Check Callback after I/O Callback Executed

So this is as per the Order we understood in Event Loop

This is Next Tick Callback
This is a Promise Callback
This is a Timer Callback
This is a I/O callback
This is a Check Callback


* Key thing to understand is , the Check Callback is inserted into Check Queue after I/O callback is Executed . This allowed Check Queue to be called after I/O Callback


*/


fs.readFile(__filename,()=>{
    console.log("This is a I/O callback")
    setImmediate(()=>{
        console.log("This is a Check Callback")
    })
    process.nextTick(()=>{
        console.log("This is Next Tick Callback")
    })
    Promise.resolve().then(()=>{
        console.log("This is a Promise Callback")
    })
})


setTimeout(()=>{
    console.log("This is a Timer Callback")
},0);


for (let index = 0; index < 2000000000; index++) {}

/*

Works as per expected

This is a Timer Callback
This is a I/O callback
This is Next Tick Callback
This is a Promise Callback
This is a Check Callback

Event Loop has 

1. Timer Callback and I/O Callback . As per the Event Loop , TImer Call back has high Priority . So callback of TImer Executes
2. Now control goes to I/O callback and prints I/O CB
3. I/O Queues up Microtask and Check Queue
During the Second Iteration the Microtask Queue takes High Priority
4. So Microtask Queue CB is executed
5. Finally the Check Queue CB is executed


So it is evident that Check Queue is executed after Microtask , Timer ,  I/O Queue

*/
