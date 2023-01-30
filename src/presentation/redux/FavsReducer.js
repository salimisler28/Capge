const initialState = {
  favs: [],
};

export const favsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FAV": {
      return {
        ...state,
        favs: [...state.favs, action.payload],
      };
    }
    case "REMOVE_FAV": {
      return {
        ...state,
        favs: state.favs.filter(item => item.id !== action.payload),
      };
    }
    default: {
      return state;
    }
  }
};
