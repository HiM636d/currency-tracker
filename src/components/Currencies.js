import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Result from "./Result";
import { fetchRates, setSelected } from "../redux/Actions/rateActions";

const Currencies = () => {
  const Rates = useSelector((state) => state.allRates); //assigning state to a varial
  const dispatch = useDispatch(); //assigning the useDispatch function provided by redux


  // Launching fetchRate on page load
  useEffect(() => {
    dispatch(fetchRates());
  }, []); 

  //iterating over keys and  displaying each value as an option
  const options = Object.keys(Rates.symboles).map((key) => (
    <option value={key}>{Rates.symboles[key]}</option>
    )); 

  
    return (
    <div>
      <h1>Select currency to get rates</h1>

      <select
        class="ui dropdown"
        onChange={(e) => dispatch(setSelected(e.target.value))}
      >
        {options}
      </select>
      <Result />
    </div>
  );
};

export default Currencies;
