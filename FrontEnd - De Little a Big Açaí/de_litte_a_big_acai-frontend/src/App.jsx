import { useState } from 'react'
import NavBarEstoque from './components/NavBarEstoque'
import PageBuscarEstoque from './pages/PageBuscarEstoque'
import FilterEstoque from './components/FilterEstoque'

function App() {
  return (
    <>      
      <NavBarEstoque />
      <PageBuscarEstoque />
      <FilterEstoque />
    </>
  )
}

export default App
