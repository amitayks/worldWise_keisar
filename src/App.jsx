import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";

import { CityProvider } from "./contexts/CityContext";
import { FakeAuthProvider } from "./contexts/FakeAuthContext";

import { CityList } from "./components/CityList/CityList";
import { CountryList } from "./components/CountryList/CountryList";
import { City } from "./components/Ctiy/City";
import { Form } from "./components/Form";
import ProtectedRouts from "./pages/ProtectedRouts";
import { SpinnerFullPage } from "./components/SpinnerFullPage/SpinnerFullPage";

// import HomePage from "./pages/Homepage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";

const HomePage = lazy(() => import("./pages/HomePage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <FakeAuthProvider>
      <CityProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path='product' element={<Product />} />
              <Route path='pricing' element={<Pricing />} />
              <Route path='login' element={<Login />} />
              <Route
                path='App'
                element={
                  <ProtectedRouts>
                    {" "}
                    <AppLayout />
                  </ProtectedRouts>
                }
              >
                <Route index element={<Navigate replace to={"cities"} />} />
                <Route path='cities' element={<CityList />} />
                <Route path='cities/:id' element={<City />} />
                <Route path='countrys' element={<CountryList />} />
                <Route path='form' element={<Form />} />
              </Route>
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CityProvider>
    </FakeAuthProvider>
  );
}

export default App;
