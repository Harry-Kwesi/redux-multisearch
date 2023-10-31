const initialState = {
  filters: {
    country: "",
    capital: "",
    region: "",
    subregion: "",
  },
  data: [],
  filteredData: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COUNTRY_FILTERS":
      return {
        ...state,
        filters: action.payload,
      };
    case "SET_COUNTRY_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_FILTERED_DATA":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
