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

const filtersReducerDefaultState = {
  text: '',
  sortBy: '',
  sortDirection: '',
  startYear: undefined,
};

export const clear = () => ({
  type: 'CLEAR',
  defaultFilter: filtersReducerDefaultState
});