import BirdTrackerService from './services/bird-track-service.js';


export function getAPIData(comNameInput) {
  BirdTrackerService.getSpeciescode()
    .then(function(birdTrackerResponse) {
      if (birdTrackerResponse instanceof Error) {
        const errorMessage = `There was a problem accessing the bird data from eBird API,
        Status code: ${birdTrackerResponse.message}`;
        throw new Error(errorMessage);
      }
      
      let searchResultIndex= [] ;
      const regExp = new RegExp(`${comNameInput}`);
      
      for (let i = 0; i < birdTrackerResponse.length; i++) {
        
        if(birdTrackerResponse[i].comName.toString().toLowerCase().match(regExp)) {
          searchResultIndex.push(i);
          }
          
        if(searchResultIndex.length === 11) {
            break;
        } 
      } // end of for loop

      // checking how matches has been found
      if(searchResultIndex.length === 1){
        console.log(birdTrackerResponse[searchResultIndex[0]].speciesCode);
        return birdTrackerResponse[searchResultIndex[0]].speciesCode;

      } else if (searchResultIndex.length > 10) {
        return "Your search result was too broad, please provide a more specific common name.";

      } else if (searchResultIndex.length <=11 && searchResultIndex.length !== 0) {
          for(const element of searchResultIndex) {
            return (birdTrackerResponse[element].comName +" "+ birdTrackerResponse[element].speciesCode);
          }

      } else {
        console.log( "SpeciesCode was not found for " + comNameInput + " " + searchResultIndex.length);
        return null;
      }                  
    })
    .catch(function(error) {
      console.log(error);
    });
}