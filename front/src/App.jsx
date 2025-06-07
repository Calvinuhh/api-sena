import { useState } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import RegistroUsuario from './RegistroUsuario';

function App() {


  return (
    <>
      <Routes>
        <Route 
          path='/registro' 
          element={<RegistroUsuario/>}
        />
      </Routes>
    </>
  )
}

export default App
