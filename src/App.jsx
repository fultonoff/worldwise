import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/homePage"
import Pricing from "./pages/pricing"
import Product from "./pages/product"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login"



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="pricing" element={<Pricing/>}/>
        <Route path="product" element={<Product/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="app" element={<AppLayout/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
