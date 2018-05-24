import  _ from 'lodash';

// get visible flights
export const getFilterFlights = (flights, { sortBy, startYear, text }) => {
  const filteredItems =  _.pickBy(flights, flight => {
      const textMatch = _.startsWith(flight.pilot, text);
      const regexmatcher = new RegExp(startYear, "g");
      const startYearMatch = regexmatcher.test(flight.date);
      return textMatch && startYearMatch
  }) 

  const flightsSort = Object.keys(filteredItems).map(i => filteredItems[i]);
  const flightskey = Object.keys(filteredItems);

  let x = flightsSort.sort((a, b) => {
    if(sortBy === 'pilot' || sortBy === 'startplace'){
      if(a[sortBy] > b[sortBy]){
        return -1;
      }else{
        return 1;
      }
    }else{
      return a[sortBy] - b[sortBy];
    }
  });
  return x;
}