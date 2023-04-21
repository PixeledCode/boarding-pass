import React, { useState } from 'react'
import './App.css'
import { Card, FileReader } from './components'
import { checkIfFormatIsSupported } from './utils/helpers'

const formats = ['aztec', 'data_matrix', 'pdf417']

function App() {
	const [supported, setSupported] = useState(false)
	const [value, setValue] = React.useState<any>()
	const [image, setImage] = React.useState<any>()

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
	console.log(supported)

	return (
		<div className="App">
			<header className="header">
				<h1>Boarding Pass</h1>
				{supported && (
					<FileReader
						onValueChange={setValue}
						setImage={setImage}
						formats={formats}
					/>
				)}
			</header>

			{<Card value={value} image={image} />}
		</div>
	)
}

export default App
