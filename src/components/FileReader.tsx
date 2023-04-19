import React from 'react'
import { fetchFlightDetails, parseBarcode } from '../utils/helpers'

interface FileReaderProps {
	formats: string[]
}

export const FileReader = ({ formats }: FileReaderProps) => {
	const [file, setFile] = React.useState()
	const [value, setValue] = React.useState<any>()

	React.useEffect(() => {
		if (file) {
			const bd = new window.BarcodeDetector({
				formats,
			})
			try {
				createImageBitmap(file)
					.then((img) => bd.detect(img))
					.then((resp) => {
						const parsed = parseBarcode(resp[0].rawValue)
						setValue(parsed)
					})
			} catch (err) {
				console.error('Barcode detection failed', err)
			}
		}
	}, [file])

	React.useEffect(() => {
		if (value) {
			fetchFlightDetails(value.carrierFs, value.carrierFlightId).then((res) => {
				console.log(res)
			})
		}
	}, [value])

	return (
		<>
			<input
				type="file"
				id="avatar"
				name="avatar"
				accept="image/png, image/jpeg"
				onChange={(e: any) => {
					setFile(e.target.files[0])
				}}
			/>
			{value && <pre>{JSON.stringify(value, null, 2)}</pre>}
		</>
	)
}
