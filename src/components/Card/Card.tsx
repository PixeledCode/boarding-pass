import React from 'react';
import { BsArrow90DegUp } from 'react-icons/bs';
import { IoIosAirplane } from 'react-icons/io';
import {
  MdOutlineAirplaneTicket,
  MdOutlineDesktopAccessDisabled,
} from 'react-icons/md';
import { getAirlineName, getAirport, getBarCodeImage } from '../../utils/fetch';
import styles from './Card.module.scss';
import { Skeleton } from '../Skeleton';
import cx from 'classnames';

interface CardProps {
  value: any;
  update: any;
  supported: boolean;
}

export const Card = ({ value, update, supported }: CardProps) => {
  const pass = value[value.length - 1];
  const [enlarge, setEnlarge] = React.useState(false);

  async function getValues() {
    const obj: any = {};
    await getBarCodeImage(pass.rawValue).then((blob) => {
      const reader: any = new FileReader();
      reader.addEventListener('load', () => {
        obj.code = reader.result;
      });
      // Read the contents of the specified Blob or File
      reader.readAsDataURL(blob);
    });
    // .then((res) => (obj.code = res))
    await getAirport(pass.departureCode).then((res) => (obj.departure = res));
    await getAirport(pass.arrivalCode).then((res) => (obj.arrival = res));
    await getAirlineName(pass.iata).then((res) => (obj.airline = res.name));

    update({
      ...pass,
      ...obj,
    });
  }

  React.useEffect(() => {
    if (supported && value.length > 0) {
      if (!pass.code) getValues();
    }
  }, [value.length]);

  const name = pass ? `${pass.firstName} ${pass.lastName}` : '';
  return (
    <article className={styles.Card}>
      <div
        className={cx(styles.Backdrop, enlarge && styles.BackdropShow)}
        onClick={() => setEnlarge(!enlarge)}
      />
      <div className={styles.Cut}></div>
      {!supported ? (
        <div className={styles.Default}>
          <MdOutlineDesktopAccessDisabled size={128} />
          <p>Oops!</p> 
          <p>Barcode Reader API is not supported in your browser.</p>
        </div>
      ) : pass ? (
        <>
          <header className={styles.Header}>
            <h2>{pass.airline || 'Airline'}</h2>
            <Box heading="Seat" value={pass.seat} />
          </header>
          <div className={styles.Primary}>
            <Box
              heading={pass.departure || 'Departure'}
              value={pass.departureCode}
            />
            <IoIosAirplane size={48} />
            <Box heading={pass.arrival || 'Arrival'} value={pass.arrivalCode} />
          </div>
          <div className={styles.Auxiliary}>
            <Box heading="Flight" value={pass.flightCode} />
            <Box heading="Date" value={pass.date} />
            <Box heading="Class" value={pass.cabin} />
          </div>
          <div className={styles.Secondary}>
            <Box heading="Name" value={name} />
            <Box heading="PNR" value={pass.pnr} />
            <Box heading="Seq No." value={pass.squence} />
          </div>
          <button
            className={cx(styles.Code, enlarge && styles.Enlarge)}
            onClick={() => setEnlarge(!enlarge)}
          >
            {pass.code ? (
              <img
                width={120}
                height={120}
                src={pass.code}
                alt="boarding pass barcode"
              />
            ) : (
              <Skeleton />
            )}
          </button>
        </>
      ) : (
        <div className={styles.Default}>
          <div className={styles.Arrow}>
            <BsArrow90DegUp size={32} />
          </div>
          <MdOutlineAirplaneTicket size={128} />
          <p>Use the '+' icon on top to upload image of your boarding pass</p>
        </div>
      )}
    </article>
  );
};

const Box = ({ heading, value }: { heading: string; value: string }) => {
  return (
    <div className={styles.Box}>
      <span>{heading}</span>
      <strong>{value}</strong>
    </div>
  );
};
