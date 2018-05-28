import  _ from 'lodash';

// get visible flights
export const getFilterFlights = (flights, { sortDirection, sortBy, startYear, text }) => {
  const filteredItems =  _.pickBy(flights, flight => {
      const textMatch = _.startsWith(flight.pilot, text);
      const regexmatcher = new RegExp(startYear, "g");
      const startYearMatch = regexmatcher.test(flight.date);
      return textMatch && startYearMatch
  }) 

  const flightsSort = Object.keys(filteredItems).map(i => filteredItems[i]);
  //TODO: improve sorting - too many if elses
  let x = flightsSort.sort((a, b) => {
    if(sortDirection === 'asc'){
      if(sortBy === 'pilot' || sortBy === 'startplace'){
        if(a[sortBy] > b[sortBy]){
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
      if(sortBy === 'pilot' || sortBy === 'startplace'){
        if(a[sortBy] > b[sortBy]){
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
  return x;
}