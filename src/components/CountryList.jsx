/* eslint-disable react/prop-types */
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import { uniqBy } from "lodash";
import { useCity } from "../contexts/CityContext";

function CountryList() {
  const { cities, isLoading } = useCity();
  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on acity at the map"}
      />
    );

  const countrys = uniqBy(cities, "country");

  return (
    <ul className={styles.countryList}>
      {countrys.map((country, i) => {
        return <CountryItem country={country} key={i} />;
      })}
    </ul>
  );
}

export default CountryList;