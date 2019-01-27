const filtersReducerDefaultState = {
  text: '',
  sortBy: '',
  startYear: undefined,
  sortDirection: '',
  filterSelects: '',
  filterAltitude: '',
  filterRegion: '',
  filterWinddirections: '',
  filterCountry: '',
  filterSearchtext: ''
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
      case 'FILTER_TEXT':
          return {
              ...state,
              text: action.text
          };
      case 'START_YEAR':
          return {
              ...state,
              startYear: action.startYear
          };
      case 'SORT_BY':
          return {
              ...state,
              sortBy: action.sortType
          };
      case 'SORT_DIRECTION':
        return {
            ...state,
            sortDirection: action.sortType
        };
      case 'SORT_FILTERSELECTS':
        return {
            ...state,
            filterSelects: action.filterSelects
        };
     //Filter for Startplaces
      case 'FILTER_ALTITUDE':
        return {
            ...state,
            filterAltitude: action.filterAltitude
        };
      case 'FILTER_REGION':
        return {
            ...state,
            filterRegion: action.filterRegion
        };
      case 'FILTER_WINDDIRECTIONS':
        return {
            ...state,
            filterWinddirections: action.filterWinddirections
        };
      case 'FILTER_COUNTRY':
        return {
            ...state,
            filterCountry: action.filterCountry
        };
    case 'FILTER_SEARCHTEXT':
        return {
            ...state,
            filterSearchtext: action.filterSearchtext
        };
      case 'CLEAR':
          return {
              ...state,
              text: action.defaultFilter.text,
              sortBy: action.defaultFilter.sortBy,
              startYear: action.defaultFilter.startYear,
              sortDirection: action.defaultFilter.sortDirection,
              filterSelects: action.defaultFilter.filterSelects,
              filterAltitude: action.defaultFilter.filterAltitude,
              filterRegion: action.defaultFilter.filterRegion,
              filterWinddirections: action.defaultFilter.filterWinddirections,
              filterCountry: action.defaultFilter.filterCountry,
              filterSearchtext: action.defaultFilter.filterSearchtext
          };
      default:
          return state;
  }
}