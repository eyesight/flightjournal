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

const filtersReducerDefaultState = {
  filterText: '',
  sortBy: '',
  sortDirection: '',
  startYear: undefined,
  filterSelects: '',
};

export const clear = () => ({
  type: 'CLEAR',
  defaultFilter: filtersReducerDefaultState
});