export default class GeoCall {
  static geoGrab(radioBtnVal, radioManualTxt) {
//in HMTL set up radio buttons for 'automatically grab location from IP' and 'manually enter location'
// radioBtnVal is the users selection gathered in index.js via a css selector on the radio button portion of the form
//when the button is checked to manual, a text input field appears and whatever is entered is passed here as radioManualTxt
// in HTML radio
//in geograb call on index.js pass this checked radio button value as either 'ip' or 'manual'
    if (radioBtnVal === 'ip') {
      const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.MAPS_KEY}`;
    } else if (radioBtnVal === 'manual') {
      const userAddressApiArg = radioManualTxt.split('').join('+');
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${userAddressApiArg}&key=${process.env.MAPS_KEY}`;
    } else {
      //an error if the user manages to break the radio button binary choice
    }
    
    fetch(url, {
      method: "POST"
    })
      .then((response) => {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        } else {
          return response.json();
        }
      })
      .catch((error) => {
        return error;
      })
      .then((location) => {
        console.log(location);
        return location;
      });
  }
}