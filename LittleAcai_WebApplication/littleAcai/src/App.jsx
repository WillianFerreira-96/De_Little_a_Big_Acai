import { Routes, Route } from 'react-router-dom'
import EstoqueBuscar from './pages/EstoqueBuscar'
import EstoqueCadastrar from './pages/EstoqueCadastrar'
import EstoqueDashboard from './pages/EstoqueDashboard'

import { useState } from 'react'
import EstoqueNavBar from './components/EstoqueNavBar'
import EstoqueFilter from './components/EstoqueFilter'
import EstoqueInforItem from './components/EstoqueInforItem'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

function App() {
  const [nomeOuID, setNomeOuID] = useState(null)
  const [formData, setFormData] = useState(null)
  const [dadosItem, setDadosItem] = useState(null)
  
  return (
    <Routes>
      <Route path='/estoque/buscar'
        element={
          <>
            <EstoqueInforItem dadosItemLifting={dadosItem} />
            <EstoqueNavBar onLiftingNomeOuID={setNomeOuID} />
            <EstoqueBuscar onDadosItemLifting={setDadosItem} liftingNomeOuID={nomeOuID} formFilter={formData} />
            <EstoqueFilter onFormFilter={setFormData} />
          </>
        }
      />

      <Route path='/estoque/cadastrar'
        element={
          <>
            <EstoqueNavBar onLiftingNomeOuID={setNomeOuID} />
            <EstoqueCadastrar />
          </>
        }
      />

      <Route path='/estoque/dashboard'
        element={
          <>
            <EstoqueNavBar onLiftingNomeOuID={setNomeOuID} />
            <EstoqueDashboard />
          </>
        }
      />

    </Routes>
  )
}

export default App
