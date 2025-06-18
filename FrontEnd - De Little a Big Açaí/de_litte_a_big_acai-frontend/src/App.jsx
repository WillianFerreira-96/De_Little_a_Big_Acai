import { useState } from 'react'
import NavBarEstoque from './layouts/NavBarEstoque.jsx'
import PageBuscarEstoque from './pages/PageBuscarEstoque.jsx'
import FilterEstoque from './layouts/FilterEstoque.jsx'

function App() {
  return (
    <>
      <NavBarEstoque/>
      <PageBuscarEstoque/>
      <FilterEstoque/>
    </>
  )
}

export default App
