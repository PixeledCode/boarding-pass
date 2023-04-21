import React, { useState } from 'react'
import './App.css'
import { Card, FileReader } from './components'
import { usePassesStore } from './config'
import { checkIfFormatIsSupported } from './utils/helpers'

const formats = ['aztec', 'data_matrix', 'pdf417', 'qr_code']

function App() {
	const [supported, setSupported] = useState(false)
	const store = usePassesStore()

	React.useEffect(() => {
		if ('BarcodeDetector' in window) {
			const isSupported = checkIfFormatIsSupported(formats)
			isSupported.then((res) => {
				setSupported(res)
				return
			})
		}
		setSupported(false)
	}, [])

	return (
		<div className="App">
			<header className="header">
				<h1>Passes</h1>
				{supported && (
					<FileReader onValueChange={store.addPass} formats={formats} />
				)}
			</header>

			<Card value={store.passes} update={store.updatePass} />
		</div>
	)
}

export default App
