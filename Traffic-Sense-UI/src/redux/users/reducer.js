import { SET_USER } from "./action";

const initialState = {
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
