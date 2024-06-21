import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRoutes } from './routes'
import { AuthProvider } from './contexts/general'
import './global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	// <React.StrictMode>
		<AuthProvider>
			<AppRoutes />
		</AuthProvider>
	// </React.StrictMode>,
)
