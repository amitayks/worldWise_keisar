// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button/Button";
import { UseUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCity } from "../contexts/CityContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = UseUrlPosition();
  const { createNewCity, isLoading: loadingForm } = useCity();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!lat && !lng) return;

    async function fetchCityName() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode)
          throw new Error("please select another area for the activity :)");

        console.log(data);

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCityName();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };

    await createNewCity(newCity);
    navigation("/app/cities");
  }

  if (isLoading) return <Spinner />;
  if (!lat && !lng) return <Message message={`start by clickng in the map!`} />;

  if (error) {
    return <Message message={error} />;
  }

  return (
    <form
      className={`${styles.form} ${loadingForm ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <>
        <div className={styles.row}>
          <label htmlFor='cityName'>City name</label>
          <input
            id='cityName'
            onChange={(e) => setCityName(e.target.value)}
            value={cityName}
          />
          <span className={styles.flag}>{emoji}</span>
        </div>

        <div className={styles.row}>
          <label htmlFor='date'>When did you go to {cityName}?</label>
          <DatePicker
            id='datepicker'
            onChange={(date) => setDate(date)}
            selected={date}
            dateFormat={"dd MM yyyy"}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor='notes'>Notes about your trip to {cityName}</label>
          <textarea
            id='notes'
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          />
        </div>

        <div className={styles.buttons}>
          <Button type={"primary"} onClick={handleSubmit}>
            Add
          </Button>
          <Button
            type={"back"}
            onClick={(e) => {
              e.preventDefault();
              navigation(-1);
            }}
          >
            &larr; Back
          </Button>
        </div>
      </>
    </form>
  );
}

export default Form;
