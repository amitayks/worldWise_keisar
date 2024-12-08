/* eslint-disable react/prop-types */
import { Spinner } from "../Spinner/Spinner";
import { CityItem } from "../CityItem";
import styles from "./CityList.module.css";
import { Message } from "../Message/Message";
import { useCity } from "../../contexts/CityContext";

function CityList() {
  const { cities, isLoading } = useCity();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on acity at the map"}
      />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city, i) => {
        return <CityItem city={city} key={i} />;
      })}
    </ul>
  );
}

export { CityList };
