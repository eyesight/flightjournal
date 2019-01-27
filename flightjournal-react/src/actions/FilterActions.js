export const filterText = (text = '') => ({
  type: 'FILTER_TEXT',
  text
});

export const startYear = (startYear) => ({
  type: 'START_YEAR',
  startYear
});

export const sortBy = (sortType) => ({
  type: 'SORT_BY',
  sortType
});

export const sortDirection = (sortType) => ({
  type: 'SORT_DIRECTION',
  sortType
});

export const filterSelects = (filterSelects) => ({
  type: 'SORT_FILTERSELECTS',
  filterSelects
});
 
export const filterAltitude = (filterAltitude) => ({
  type: 'FILTER_ALTITUDE',
  filterAltitude
});

export const filterRegion = (filterRegion) => ({
  type: 'FILTER_REGION',
  filterRegion
});

export const filterWinddirections = (filterWinddirections) => ({ 
  type: 'FILTER_WINDDIRECTIONS',
  filterWinddirections
});

export const filterCountry = (filterCountry) => ({ 
  type: 'FILTER_COUNTRY',
  filterCountry
});

export const filterSearchtext = (filterSearchtext) => ({ 
  type: 'FILTER_SEARCHTEXT',
  filterSearchtext
});

const filtersReducerDefaultState = {
  filterText: '',
  sortBy: '',
  sortDirection: '',
  startYear: undefined,
  filterSelects: '',
  filterAltitude: '',
  filterRegion: '',
  filterWinddirections: '',
  filterCountry: '',
  filterSearchtext: ''
};

export const clear = () => ({
  type: 'CLEAR',
  defaultFilter: filtersReducerDefaultState
});