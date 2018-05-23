const filtersReducerDefaultState = {
  text: '',
  sortBy: '',
  startYear: undefined,
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
      case 'CLEAR':
          return {
              ...state,
              text: action.defaultFilter.text,
              sortBy: action.defaultFilter.sortBy,
              startYear: action.defaultFilter.startYear
          };
      default:
          return state;
  }
}