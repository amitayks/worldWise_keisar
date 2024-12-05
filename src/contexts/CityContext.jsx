/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const CityContext = createContext();

const initalState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loading":
      return { ...state, cities: action.value, isLoading: false };
    case "cities/current":
      return { ...state, isLoading: false, currentCity: action.value };
    case "cities/new":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.value],
        currentCity: action.value,
      };
    case "cities/delete":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => {
          if (city.id !== action.value) return city;
        }),
      };

    default:
      throw new Error(`unknown action, ${action.type}`);
  }
}

function CityProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initalState
  );

  const BASE_URL_LINK = "http://localhost:8000";

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });

        const res = await fetch(`${BASE_URL_LINK}/cities`);
        const data = await res.json();

        dispatch({ type: "cities/loading", value: data });
      } catch (error) {
        alert(error);
      }
    }

    fetchCities();
  }, []);

  const getCurrentCity = useCallback(
    async function getCurrentCity(id) {
      if (Number(id) === currentCity.id) return;

      try {
        dispatch({ type: "loading" });

        const res = await fetch(`${BASE_URL_LINK}/cities/${id}`);
        const data = await res.json();

        dispatch({ type: "cities/current", value: data });
      } catch (error) {
        alert(`cannot fetch city from the server`);
      }
    },
    [currentCity]
  );

  async function createNewCity(newCity) {
    try {
      dispatch({ type: "loading" });

      const res = await fetch(`${BASE_URL_LINK}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "cities/new", value: data });
    } catch (error) {
      alert(`cannot create city in the server`);
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL_LINK}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "cities/delete", value: id });
    } catch (error) {
      alert(`cannot delete city from the server`);
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCurrentCity,
        createNewCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCity() {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error("usePosts cannot be provided outside context Provider");
  }
  return context;
}

export { CityProvider, useCity };
