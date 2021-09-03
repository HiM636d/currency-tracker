import { ActionTypes } from "../actionTypes/action-types";

//initial values of the redux State are set
const initialState = {
  rates: {},
  symboles: {},
  currencyPerCountry: {},
  selectedCode: "",
  selectedCurrency: "",
};

//switch between cases depending on the action type sent with the dispatch
export const rateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_RATES:
      return { ...state, rates: payload };

    case ActionTypes.SET_SYMBOLES:
      return { ...state, symboles: payload };

    case ActionTypes.SET_CURRENCY_PER_COUNTRY:
      return { ...state, currencyPerCountry: payload };

    case ActionTypes.SET_SELECTED_CODE:
      return { ...state, selectedCode: payload };

    case ActionTypes.SET_SELECTED_CURRENCY:
      return { ...state, selectedCurrency: payload };

    default:
      return state;
  }
};
