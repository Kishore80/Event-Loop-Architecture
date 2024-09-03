/**

JS is Single Threaded , Blocking and Synchronous

To make Async Programming Possible , We make use of Libuv Library

Let's understand how JS code is Executed 

Picturize the below

We have V8 Engine consisting 2 Components
    1. Memory Heap
        # Allocates Memory to Variables...etc

    2. Call Stack
        # Executes Functions in Call Stack
        # Removes Function in Stack after execution
    
We have Libuv
    1. When we have async functions , it is offloaded to Libuv
    2. It will make use of the Thread pool to execute those async operations 
       which ensures the Main Thread is not blocked

 */

console.log("First") //This is Executed first in Call Stack and Removed from Stack After Execution
console.log("Second") //Now this Console is Executed in Call Stack and Removed after execution
console.log("Third") //Then Finally this is Executed and Removed after execution


//The Above code is Synchronous Programming and Libuv had no play in there.

//Let's look at Asynchronous Operation


console.log("First")
fs.readFile(__filename , ()=>{
    console.log("Second")
})
console.log("Third")

/*

Output :

First
Third
Second

    # First is Consoled now control comes to fs line
    # The FS Read File is a Asynchronous Function 
    # So the Call Stack gives the responsibility of Execute Read File to Libuv

    # The Call Stack is not blocked and prints Third Console
    
    # After the Libuv Completes the Execution of Read File , It's callback is Executed in the Main Call Stack
    # Which Prints the Second Console

 */

/**

Let's understand the Core Part of Libuv , which is the Event Loop

Event Loop 
    #   It is a Design pattern that co-ordinates the execution of 
        Synchronous and Asynchronous Code in Node JS
    #   This Event Loop is alive as long as the Node Application is running
    #   In every iteration of the Loop we have 6 queues
    #   The Type of callback excuted in Each Queue is different
    #   Event Loop has 4 Queue and 2 Microtask queue
                1. Timer Queue
                2. I/O Queue
                3. Check Queue
                4. Close Queue
            Microtask Queue
                1. nextTick Queue
                2. Promise Queue


    # Priority
        # JS Gives Priority to Sync Programming first
        # When the Call Stack is Empty , then the Event Loop Comes into Play

    # Event Loop : Sequence of Execution
        
        1. Callbacks in Microtask Queue are executed first
                1. next tick queue and then
                2. promise queue
        2. After Microtask Queue , Callbacks of Timer Queue are executed
        
        3. Callbacks in Microtask Queue are executed first
                1. next tick queue and then
                2. promise queue
        4. After Microtask Queue , Callbacks of I/O Queue are executed

        5. Callbacks in Microtask Queue are executed first
                1. next tick queue and then
                2. promise queue
        6. After Microtask Queue , Callbacks of Check Queue are executed
        
        7. Callbacks in Microtask Queue are executed first
                1. next tick queue and then
                2. promise queue
        8. After Microtask Queue , Callbacks of Close Queue are executed


*/
