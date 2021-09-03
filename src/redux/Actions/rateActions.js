import { ActionTypes } from "../actionTypes/action-types";
import axios from "axios";

export const setRates = (rates) => {
  return {
    type: ActionTypes.SET_RATES,
    payload: rates,
  };
};

export const setCurrencyPerCountry = (currencyPerCountry) => {
  return {
    type: ActionTypes.SET_CURRENCY_PER_COUNTRY,
    payload: currencyPerCountry,
  };
};

export const setSymboles = (symboles) => {
  return {
    type: ActionTypes.SET_SYMBOLES,
    payload: symboles,
  };
};

export const setSelectedCountry = (countryCode) => {
  return {
    type: ActionTypes.SET_SELECTED_COUNTRY,
    payload: countryCode,
  };
};
export const setSelectedCode = (selectedCode) => {
  return {
    type: ActionTypes.SET_SELECTED_CODE,
    payload: selectedCode,
  };
};

export const setSelectedCurrency = (selectedCurrency) => {
  return {
    type: ActionTypes.SET_SELECTED_CURRENCY,
    payload: selectedCurrency,
  };
};

//fetching rates and the dispatching setRates to store the rates in the Redux-State. Then launching fetchSymboles()
export const fetchRates = () => {
  return (dispatch) => {
    axios
      .get(
        "http://data.fixer.io/api/latest?access_key=6ca1be6ef09969fab871cfdaefdbb6b2"
      )
      .then((response) => {
        const rates = response.data.rates;
        dispatch(setRates(rates));
        dispatch(fetchSymboles());
      });
  };
};

//automatically launched by fetchRates ,it calles the apo and stros the symboles in the ReduxState...then automatically laucnhes fetchCurrencyPerCountry()
export const fetchSymboles = () => {
  return (dispatch) => {
    axios
      .get(
        "http://data.fixer.io/api/symbols?access_key=6ca1be6ef09969fab871cfdaefdbb6b2"
      )
      .then((response) => {
        const symboles = response.data.symbols;
        dispatch(setSymboles(symboles));
        dispatch(fetchCurrencyPerCountry());
      });
  };
};


//automatically launched by fetchSymboles() .. calls country,io api ,gets the currency per country and stores it in Redux_State
export const fetchCurrencyPerCountry = () => {
  return (dispatch) => {
     axios.get("http://country.io/currency.json").then((response) => {
      const currencyPerCountry = response.data;
      dispatch(setCurrencyPerCountry(currencyPerCountry));
     
    });
  };
};


// laucnhed when the user chooses a currency, it accesses the Redux-State ,gets the currency selected,and filders through symboles to get what country it belongs to..  and gets the rates
export const setSelected = (selectedCurrencyCode) => {

  return (dispatch, getState) => {
    const allRates = getState();
    const selectedCurrency = allRates.allRates.rates[selectedCurrencyCode];//getting the rate that belongs to the selected currency 
    const selectedCode = Object.keys(allRates.allRates.currencyPerCountry)//getting the country code from the currency per country Redux_State_Variable and stores it in selectedCode Variables
      .find(
        (key) =>
          allRates.allRates.currencyPerCountry[key] === selectedCurrencyCode
      )
      .toLowerCase();

    //storing  the rates and the country code in redux-State
    dispatch(setSelectedCurrency(selectedCurrency));
    dispatch(setSelectedCode(selectedCode));
  
  };
};
