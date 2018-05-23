import  _ from 'lodash';

// get visible flights
export const getFilterFlights = (flights, { sortBy, startYear, text }) => {
  const filteredItems =  _.pickBy(flights, flight => {
      const textMatch = _.startsWith(flight.pilot, text);
      const regexmatcher = new RegExp(startYear, "g");
      const startYearMatch = regexmatcher.test(flight.date);
      return textMatch && startYearMatch
  }) 
  return _.sortBy(filteredItems, [function(o) { return o[sortBy];}]);
}