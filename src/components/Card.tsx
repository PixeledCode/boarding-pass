import React from 'react'
import styles from './Card.module.scss'
import { getAirlineName, getAirport, getCodeVal } from '../utils/fetch'
import { IoIosAirplane } from 'react-icons/io'
import { MdOutlineAirplaneTicket } from 'react-icons/md'
import { BsArrow90DegUp } from 'react-icons/bs'

interface CardProps {
	value: any
}

export const Card = ({ value }: CardProps) => {
	const [code, setCode] = React.useState<any>()
	const [dep, setDep] = React.useState<any>('Departure')
	const [arr, setArr] = React.useState<any>('Arrival')
	const [airline, setAirline] = React.useState<any>('Airline')

	React.useEffect(() => {
		if (value) {
			getCodeVal(value.rawValue).then((res) => setCode(res))
			getAirport(value.departure).then((res) => setDep(res))
			getAirport(value.arrival).then((res) => setArr(res))
			getAirlineName(value.iata).then((res) => setAirline(res))
		}
	}, [value])

	const name = value ? `${value.firstName} ${value.lastName}` : ''

	return (
		<article className={styles.Card}>
			<div className={styles.Cut}></div>
			{value ? (
				<>
					<header className={styles.Header}>
						<h2>{airline.name || 'Airline'}</h2>
						<Box heading="Seat" value={value.seat} />
					</header>
					<div className={styles.Primary}>
						<Box heading={dep} value={value.departure} />
						<IoIosAirplane size={48} />
						<Box heading={arr} value={value.arrival} />
					</div>
					<div className={styles.Auxiliary}>
						<Box heading="Flight" value={value.flightCode} />
						<Box heading="Date" value={value.date} />
						<Box heading="Class" value={value.cabin} />
					</div>
					<div className={styles.Secondary}>
						<Box heading="Name" value={name} />
						<Box heading="PNR" value={value.pnr} />
						<Box heading="Seq No." value={value.squence} />
					</div>
					<div className={styles.Code}>
						{code && <img src={code} alt="boarding pass barcode" />}
					</div>
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
	)
}

const Box = ({ heading, value }: { heading: string; value: string }) => {
	return (
		<div className={styles.Box}>
			<span>{heading}</span>
			<strong>{value}</strong>
		</div>
	)
}
