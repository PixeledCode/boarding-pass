export async function checkIfFormatIsSupported(format: string[]) {
	return await window.BarcodeDetector.getSupportedFormats().then(
		(supportedFormats: string | string[]) => {
			return format.every((val) => supportedFormats.includes(val))
		}
	)
}

export const parseBarcode = (barcode: string) => {
	const obj: any = {}
	const splitStr = barcode.split(' ').filter(Boolean)
	console.log(splitStr)

	// Get the name of the passenger
	const name = splitStr[0].replace('M1', '').split('/')
	obj.firstName = name[1]
	obj.lastName = name[0]

	// Get the PNR number
	obj.pnr = splitStr[1]
	// Get the carrier details
	obj.carrierFs = splitStr[2].slice(6, 8)
	obj.carrierFlightId = parseInt(splitStr[3])

	return obj
}

export const fetchFlightDetails = async (
	carrierFs: string,
	carrierFlightId: number
) => {
	const url = `https://www.flightstats.com/v2/api-next/flick/1175834758?guid=34b64945a69b9cac:5ae30721:13ca699d305:XXXX&airline=${carrierFs}&flight=${carrierFlightId}&flightPlan=true&rqid=x1nkfxn99i8`
	const response = await fetch(url)
	const data = await response.json()
	return data
}
