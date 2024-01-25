import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './components/UserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter basename='/react'>
        <UserProvider>
            <App />
        </UserProvider>
    </BrowserRouter>
)
