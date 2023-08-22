import { useState, useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/homePage"
import Pricing from "./pages/pricing"
import Product from "./pages/product"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from './components/Form'

const BASE_URL = 'http://localhost:8000'


const App = () => {
  const [cities, setCities] = useState([]) 

  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    async function fetchCities(){
      setIsLoading(true)
     try{ const res = await fetch(`${BASE_URL}/cities`)
      const data = await res.json()

      setCities(data)
    }catch(err){
      alert('There was an error loading data...')
    }finally{
      setIsLoading(false)}
    }


    fetchCities()
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="pricing" element={<Pricing/>}/>
        <Route path="product" element={<Product/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="app" element={<AppLayout/>}>

          <Route index element={<Navigate replace to='cities'/>}/>
          <Route path='cities' element={<CityList cities={cities} isLoading={isLoading}/>}/>
          <Route path="cities/:id" element={<City/>}/>
          <Route path='countries' element={<CountryList cities={cities} isLoading={isLoading}/>}/>
          <Route path='form' element={<Form/>}/>
        </Route>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
