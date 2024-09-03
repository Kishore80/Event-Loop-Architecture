//Most of the Async Methods from the Built-In Methods Queue the I/O 

const fs = require('fs');

fs.readFile(__filename,()=>{
    console.log("This is a I/O callback")
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

/*

This is very clear from the Understanding of order of callback execution inside the Event Loop

This is Next Tick Callback
This is a Promise Callback
This is a Timer Callback
This is a I/O callback

Microtask Queue
    Next Tick Queue
    Promise Queue
Timer Queue
I/O Queue

*/

//Let's Add a Next Tick CB inside a Timeout CB

fs.readFile(__filename,()=>{
    console.log("This is a I/O callback")
})

process.nextTick(()=>{
    console.log("This is Next Tick Callback")
})

Promise.resolve().then(()=>{
    console.log("This is a Promise Callback")
})

setTimeout(()=>{
    console.log("This is a Timer Callback")
    process.nextTick(()=>{
        console.log("Inner Next Tick Callback")
    })
},0);

/*

This is very clear from the Understanding of order of callback execution inside the Event Loop

This is Next Tick Callback
This is a Promise Callback
This is a Timer Callback
Inner Next Tick Callback
This is a I/O callback

Microtask Queue
    Next Tick Queue
    Promise Queue
Timer Queue [* This Timer Queue also create a callback inside Next Tick Queue]
Microtask Queue [Since there is a callback inside Next Tick Queue , it will be executed before checking other queues So before executing other queue the Micr]
    Next Tick Queue
I/O Queue

*/