//We can use setTimeout or setInterval Functions to Queue the Timer Queue

console.log("One")

setTimeout(()=>{
    console.log("Two")
},0)

console.log("Three")

/**

Output

One
Three
Two

 */

//Let's understand this even more by introducing Microtask Queue and Timer Queue

setTimeout(()=>{
    console.log("Set Timeout Callback")
},0)


process.nextTick(()=>{
    console.log(`Next Tick Callback`)
}) 

Promise.resolve().then(()=>{
    console.log(`Promise Callback`)
})

/*

Output

Next Tick Callback
Promise Callback
Set Timeout Callback

This is very clear from understanding on EventLoop.js

The Sequence of Execution goes to 
    1. Next Tick Queue
    2. Promise Queue
    When there are no more callback to be executed in Micro task Queue , the control goes to 
    3. Timer Queue

The Output Printed is Exactly the Same

*/