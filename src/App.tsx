import { Toaster } from 'react-hot-toast'
import Routes from './routes'
import './assets/theme/globals.scss'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
	return (
		<ThemeProvider>
			<Routes />
			<Toaster
				position="top-center"
				reverseOrder={false}
			/>
		</ThemeProvider>
	)
}

export default App