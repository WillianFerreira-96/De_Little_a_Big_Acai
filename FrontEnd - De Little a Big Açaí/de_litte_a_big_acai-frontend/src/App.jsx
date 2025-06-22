import { useState } from 'react'
import NavBarEstoque from './components/NavBarEstoque'
import PageBuscarEstoque from './pages/PageBuscarEstoque'
import FilterEstoque from './components/FilterEstoque'

function App() {
  const [nomeOuID, setNomeOuID] = useState(null)
  const [formData, setFormData] = useState(null)
  return (
    <>      
      <NavBarEstoque onLiftingNomeOuID={setNomeOuID} />
      <PageBuscarEstoque liftingNomeOuID={nomeOuID} formFilter={formData} />
      <FilterEstoque onFormFilter={setFormData}/>
    </>
  )
}

export default App
