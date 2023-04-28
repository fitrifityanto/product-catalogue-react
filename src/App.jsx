import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./components/pages/HomePage"
import ProductPage from "./components/pages/ProductPage"
import DetailProductPage from "./components/pages/DetailProductPage"
import TablePage from "./components/pages/TablePage"
import CreatePage from "./components/pages/CreatePage"
import UpdatePage from "./components/pages/UpdatePage"
import RegisterPage from "./components/pages/RegisterPage"
import LoginPage from "./components/pages/LoginPage"
import ProtectedRoute from "./wrapper/ProtectedRoute"
import GuestRoute from "./wrapper/GuestRoute"


function App() {


  return (
    <>
   
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<ProductPage />} />
          <Route path='/products/detail/:id' element={<DetailProductPage />} />

          <Route element={<ProtectedRoute />} >  
            <Route path='/table' element={<TablePage />} />
            <Route path='/create' element={<CreatePage />} />
            <Route path='/table/edit/:id' element={<UpdatePage />} />
          </Route>

          <Route element={<GuestRoute />} >
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
 
    </>
  )
}

export default App
