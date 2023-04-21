import React, { useState } from 'react'
import './App.css'
import { Card, FileReader } from './components'
import { checkIfFormatIsSupported } from './utils/helpers'

const formats = ['aztec', 'data_matrix', 'pdf417']

function App() {
	const [supported, setSupported] = useState(false)
	const [value, setValue] = React.useState<any>()

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
				<h1>Boarding Pass</h1>
				{supported && <FileReader onValueChange={setValue} formats={formats} />}
			</header>

			<Card value={value} />
		</div>
	)
}

export default App
