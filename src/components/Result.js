import { useSelector } from "react-redux";

const Result = () => {
  const Rates = useSelector((state) => state.allRates); //assigning state to a varial
  if (Rates.selectedCode) {
    return (
      <div>
        <h1>currency code = {Rates.selectedCode}</h1>
        <h1>currency Rate = {Rates.selectedCurrency}</h1>
        <img src={"https://flagcdn.com/64x48/" + Rates.selectedCode + ".png"} />
      </div>
    );
  } else {
    return <></>;
  }
};

export default Result;
