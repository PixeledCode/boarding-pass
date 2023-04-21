import React from 'react'
import { parseBarcode } from '../utils/helpers'
import { FiPlusCircle } from 'react-icons/fi'

interface FileReaderProps {
	formats: string[]
	onValueChange: any
}

export const FileReader = ({ formats, onValueChange }: FileReaderProps) => {
	const [file, setFile] = React.useState()
	const [value, setValue] = React.useState<any>()
	const inputRef = React.useRef<HTMLInputElement>(null)

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
			onValueChange(value)
			// fetchFlightDetails(value.flightCode).then((res) => {
			// 	console.log(res)
			// })
		}
	}, [value])

	return (
		<>
			<input
				className="sr-only"
				type="file"
				ref={inputRef}
				name="boaridng-pass"
				accept="image/png, image/jpeg, image/jpg"
				onChange={(e: any) => {
					setFile(e.target.files[0])
				}}
			/>
			<button className="button-icon" onClick={() => inputRef.current?.click()}>
				<FiPlusCircle size={24} />
			</button>
		</>
	)
}
