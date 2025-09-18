export default function debounce(func , delay){
// declaring the timeout id'
let timeoutId;
return function(...args){
    //clearing the previous timeout id
    if(timeoutId){
        clearTimeout(timeoutId);
    }

    // storing the timeout id  
    timeoutId = setTimeout(()=>{
        func(...args)
    }, delay)
}

}