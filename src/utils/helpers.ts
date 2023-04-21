export async function checkIfFormatIsSupported(format: string[]) {
  return await window.BarcodeDetector.getSupportedFormats().then(
    (supportedFormats: string | string[]) => {
      return format.every((val) => supportedFormats.includes(val));
    }
  );
}

export const parseBarcode = (barcode: string) => {
  const obj: any = {};
  const splitStr = barcode.split(' ').filter(Boolean);
  obj.rawValue = barcode;

  // Get the name of the passenger
  const name = splitStr[0].replace('M1', '').split('/');
  obj.firstName = name[1];
  obj.lastName = name[0];

  // User Details
  obj.pnr = splitStr[1];
  obj.seat = splitStr[4].slice(4, 8).replace(/^0+/, '');
  obj.squence = splitStr[4].slice(8, 13);
  obj.cabin = splitStr[4].slice(3, 4);
  obj.date = convertJulianDate(parseInt(splitStr[4].slice(0, 3)));

  // Get the carrier details
  obj.iata = splitStr[2].slice(6, 8);
  obj.flightCode = obj.iata + parseInt(splitStr[3]);
  obj.departureCode = splitStr[2].slice(0, 3);
  obj.arrivalCode = splitStr[2].slice(3, 6);

  return obj;
};

function convertJulianDate(julian: number) {
  let timeStamp = new Date().setFullYear(new Date().getFullYear(), 0, 1);
  let yearFirstDay = Math.floor(timeStamp / 86400000);
  let date = (yearFirstDay + (julian - 1)) * 86400000;

  return new Date(date)
    .toUTCString()
    .split(',')[1]
    ?.trim()
    .split(' ')
    .slice(0, 3)
    .join(' '); // eg: 1 Apr 2023
}

export function uniqueID() {
  return Math.floor(Math.random() * Date.now());
}
