async function getAnimalData(){
    const response=await fetch("https://fakerapi.it/api/v1/persons") ;
    const finalData=await response.json()
    console.log(finalData)
    // document.getElementById("container").innerHTML=JSON.stringify(finalData.data)
}


// EASY WAY OF WRITING/UNDERSTANDING ABOVE METHOD
// function getAnimalData() {
//     const response=fetch("https://fakerapi.it/api/v1/persons") 
//         .then(function(response){
//             response.json() //method is chained to handle the Promise returned by fetch(), taking a callback function that processes the response.
//                 .then(function (finalData) {//method is chained to handle the Promise returned by response.json(), with a callback function that processes the final JSON data retrieved from the API.
//                 console.log(finalData)
//             });
//         });
//     }

