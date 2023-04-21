import React from 'react'
import { fetchFlightDetails, parseBarcode } from '../utils/helpers'
import { FiPlusCircle } from 'react-icons/fi'
// import { SymbologyType, createStream } from 'symbology'

interface FileReaderProps {
	formats: string[]
	onValueChange: any
	setImage: any
}

export const FileReader = ({
	formats,
	onValueChange,
	setImage,
}: FileReaderProps) => {
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
					.then(async (resp) => {
						const symbologyURL = `https://bwipjs-api.metafloor.com/?bcid=azteccode&text=${resp[0].rawValue}&scale=4`
						await fetch(symbologyURL)
							.then((res) => res.blob())
							.then((myBlob) => {
								const objectURL = URL.createObjectURL(myBlob)
								setImage(objectURL)
							})

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
