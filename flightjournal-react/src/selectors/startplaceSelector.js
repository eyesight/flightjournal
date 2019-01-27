import  _ from 'lodash';
import { compare2Arrays } from '../utils/compare2Arrays';

export const getFilterStartplaces = (startplaces, {filterRegion, filterWinddirections, filterAltitude, filterCountry, filterSearchtext}) => {
  let filtered = [];
  //Filter-functions for the startarea-Object on the first level in the object. E.G Startarea.id.theFilteredThing
  let filteredItems =  _.pickBy(startplaces, startplace => {
      //filter searchtext 
      let textMatch = _.startsWith(startplace.name.toLowerCase(), filterSearchtext.toLowerCase());

      //filter the regions
      const regionMatch = _.startsWith(startplace.region.name, filterRegion);

      //filter the countries
      const countryMatch = _.startsWith(startplace.region.country, filterCountry)
      
      //filter the startplaces in the Startarea-Object (second level in the object. E.G. Startarea.id.startplaces.id.theFilteredThing)
      let picketStartplaces = _.pickBy(startplace.startplaces, sp => {
        //filter the Altitude in the Startplaces
        let numbSpAlt = Number(sp.altitude);
        let numbFilter = Number(filterAltitude);
        let spaltitudeMatch = (numbSpAlt <= numbFilter && numbSpAlt >= numbFilter-500) || !filterAltitude;

        //filter the Winddirections
        let Winddirections = Object.keys(sp.winddirectionsId);
        let resultOfComparedArrays = [];
        let spWindMatch = true;
        //if user selected a Winddirection, compare the array of windIds in Startplaces with the array of the filtered Wind-Elements
        if(filterWinddirections && filterWinddirections.length !== 0){
          resultOfComparedArrays = compare2Arrays(filterWinddirections, Winddirections);
          //if we have a match, return true
          spWindMatch = (resultOfComparedArrays.length !== 0) ? true : false;
        }
        //filter the Winddirections in the Startplaces
        return spaltitudeMatch && spWindMatch;
      });
      //add a new object to the startplace-Object "filteredStartplaces", and check if it has something in it
      startplace.filteredStartplaces = picketStartplaces;

      if(!_.isEmpty(startplace.filteredStartplaces) && regionMatch === true && countryMatch === true && textMatch === true){
        filtered.push(startplace.filteredStartplaces);
      }
      //if the Startplaces-Object in the Area isn't empty, return the object
      let filteredSP = !_.isEmpty(startplace.filteredStartplaces);
      return regionMatch && filteredSP && countryMatch && textMatch
  });

  //We push a copie of "startplaces" in the object of startareas with the name "filteredStartplaces" in it, which contains the filtered items to grab. If we just 
  //TODO: is this ok? Or is there an other way, than change the Item we got here to copy
  Object.keys(filteredItems).map((i, ind) => {
    return filteredItems[i].filteredStartplaces = filtered[ind];
  });

  //Sorting the Startplaces by alphabet
  const startplacesSort = Object.keys(filteredItems).map(i => filteredItems[i]);
  filteredItems = startplacesSort.sort((a, b) => {
    if(a.name < b.name){
      return -1;
    }else{
      return 1;
    }
  });
  
  
  return filteredItems;
}