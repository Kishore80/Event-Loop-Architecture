console.log("One")

process.nextTick(()=>{ //A callback Function , Just Prints the Console
    console.log(`This is a process.nextTick 1`);
})

console.log("Two")


/**

Output

One
Two
This is a process.nextTick 1

#  In Node JS , All user writen Sync Code takes Priority Over Async Code
#  So the run time 
        1. Console 1 Prints
        2. Control comes to Process.nextTick -> It's callback is pushed to Microtask Queue
        3. Since we have sync code to execute the callback function must have to wait and call stack executes console 2
        4. Now there is no sync code to execute and Event Loop comes in
        5. Now the callback function is executed and prints console 


 */


Promise.resolve().then(()=> {
    console.log(`This is a Promise callback`)
})

process.nextTick(()=>{
    console.log(`This is a Next Tick Callback`)
})

/**

Output : 

This is a Next Tick Callback
This is a Promise callback

# Event Loop gives Priority to Next Tick Callback First and then Promise Callback

 */


/**


process.nextTick() = This schedules the callback to be executed in the next iteration but before other I/O Operations

process.nextTick() is not recommended because the control will stay in Microtask queue and it will not pass to Other Queues like Timer , I/O..etc


 */