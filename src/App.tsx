import React, { useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import { FileReader } from './components'
import { checkIfFormatIsSupported } from './utils/helpers'

const formats = ['aztec', 'data_matrix', 'pdf417']

function App() {
	const [supported, setSupported] = useState(false)

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
			<div>
				<a href="https://reactjs.org" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Boarding Pass</h1>
			<p>Barcode Detector is {supported ? 'Supported' : ' Not Supported'}</p>
			{supported && <FileReader formats={formats} />}
		</div>
	)
}

export default App
