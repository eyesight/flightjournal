import  _ from 'lodash';

export const getFilterFlights = (flights, { sortDirection, sortBy, startYear, text, filterSelects}) => {
  //Filter-functions
  let filteredItems =  _.pickBy(flights, flight => {
      const pilotMatch = _.startsWith(flight.pilot.email, text);
      const regexmatcher = new RegExp(startYear, "g");
      const startYearMatch = regexmatcher.test(flight.date);
      //Month-filter add monthes in a string to a regex
      let reg = '';
      if(filterSelects !== []){
        //filterSelect is pseudo-array - must be converted to a real one
        let convertedArray = [];
        for(let i = 0; i < filterSelects.length; ++i){
          convertedArray.push(filterSelects[i]);
        }
        reg = convertedArray.join('|');
      }else{
        reg='';
      }
      //TODO: Regex shoud exclude 11 if it matches 1
      let monthRegex = new RegExp(reg, 'g');
      const monthMatch = monthRegex.test(flight.date.split('.')[1]);
      return pilotMatch && startYearMatch && monthMatch
  }) 
  
  //Sort-function
  const flightsSort = Object.keys(filteredItems).map(i => filteredItems[i]);
  //TODO: improve sorting - too many if elses
  filteredItems = flightsSort.sort((a, b) => {
    if(sortDirection === 'asc'){
      if(sortBy === 'pilot'){
        if(a[sortBy].name > b[sortBy].name){
          return -1;
        }else{
          return 1;
        }
      }else if(sortBy === 'startplace'){
        if(a[sortBy].areaName > b[sortBy].areaName){
          return -1;
        }else{
          return 1;
        }
      }else if (sortBy === 'date'){
        let pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
        let aDp = a.date.replace(pattern,'$3-$2-$1');
        let bDp = b.date.replace(pattern,'$3-$2-$1');
        if (aDp > bDp)
          return 1;
        else
          return -1;
      }else{
        return a[sortBy] - b[sortBy];
      }
    }else{
      if(sortBy === 'pilot'){
        if(a[sortBy].name > b[sortBy].name){
          return 1;
        }else{
          return -1;
        }
      }else if(sortBy === 'startplace'){
        if(a[sortBy].areaName > b[sortBy].areaName){
          return 1;
        }else{
          return -1;
        }
      }else if (sortBy === 'date'){
        let pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
        let aDp = a.date.replace(pattern,'$3-$2-$1');
        let bDp = b.date.replace(pattern,'$3-$2-$1');
        if (aDp > bDp)
          return -1;
        else
          return 1;
      }else{
        return b[sortBy] - a[sortBy];
      }
    } 
  });
  return filteredItems;
}