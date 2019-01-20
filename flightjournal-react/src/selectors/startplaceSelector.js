import  _ from 'lodash';

export const getFilterStartplaces = (startplaces, { sortDirection, sortBy, startYear, text, filterSelects}) => {
  console.log(filterSelects);
  console.log(text);
  //Filter-functions
  let filteredItems =  _.pickBy(startplaces, startplace => {
      let allWinddirections = Object.keys(startplace.startplaces).map(i => startplace.startplaces[i].winddirectionsId);
      const windMatch = _.filter(startplace.startplaces, function(o) { return o.winddirectionsId.n; });
      //console.log(windMatch);
      return  windMatch
  }) 
  
  //Sort-function
  //const flightsSort = Object.keys(filteredItems).map(i => filteredItems[i]);
  //TODO: improve sorting - too many if elses
  /* filteredItems = flightsSort.sort((a, b) => {
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
  }); */
  return filteredItems;
}