//This IOPolling is very essential and it changes the order of execution

//I/O Events are Polled and Callback Functions are added only after I/O completes it's execution


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

setImmediate(()=>{
    console.log("This is a Check Callback")
})

for (let index = 0; index < 2000000000; index++) {}


/*

We got a different response than we understood so far

This is Next Tick Callback -> Microtask Next Tick Queue
This is a Promise Callback -> Microtask Promise Queue
This is a Timer Callback -> Timer Queue
This is a Check Callback -> Check Queue [Notice why the Check Queue is executed before Timer Queue]
This is a I/O callback -> I/O Queue

When the Control comes to I/O Queue for the first time , the FS callback has not completed execution .

Without Completing the Execution , a I/O queue cannot execute it's corresponding callback

Since the I/O Queue is Empty , The Control goes to Check Queue and Executes it's callback

After the Execution of Check Queue callback , The Event Loop finds if there are any callback pending to execute and notices the I/O callback 

and hence executes the I/O Finally


NOTE : I/O Events are Polled and Callback Functions are added only after I/O completes it's execution

*/