import { SET_LOADING_STATUS , GET_ARTICLES} from "../actions/actionType";

const INITIAL_STATE = {
  articles : [],
  loading: false,
};

const articalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADING_STATUS: {
      return {
        ...state,
        loading: action.loading,
      };
    }

    case GET_ARTICLES : {
      return {
        ... state,
        articles : action.payload,
      };
    }

    default:
      return state;
  }
};

export default articalReducer;
