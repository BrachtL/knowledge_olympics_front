import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/login/login.jsx'
//import { Questions } from './pages/questions' //3 considerações:
//1 - o arquivo padrão é o index.jsx, então não precisa informar './home/index.jsx'
//2 - estou importando a função Home() (não sei porque a letra maiúscula) do arquvio index.jsx
//3 - precisa colcoar {} quando não é exportado pelo método default, por exemplo: "export default Home"
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
)
