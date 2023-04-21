import React from 'react'
import styles from './Card.module.scss'

interface CardProps {
	value: any
}

export const Card = ({ value }: CardProps) => {
	const [code, setCode] = React.useState<any>()

	async function fetchCode(rawValue: string) {
		const symbologyURL = `https://bwipjs-api.metafloor.com/?bcid=azteccode&text=${rawValue}&scale=4`
		await fetch(symbologyURL)
			.then((res) => res.blob())
			.then((myBlob) => {
				const objectURL = URL.createObjectURL(myBlob)
				setCode(objectURL)
			})
	}

	React.useEffect(() => {
		if (value) {
			fetchCode(value?.rawValue)
		}
	}, [value])

	const name = value ? `${value.firstName} ${value.lastName}` : ''

	return (
		<div className={styles.Card}>
			{value && (
				<>
					<div className={styles.Header}>
						<h2>Indigo</h2>
						<Box heading="Seat" value={value.seat} />
					</div>
					<div className={styles.Primary}>
						<span>{value.departure}</span>
						<span>{value.arrival}</span>
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
			)}
		</div>
	)
}

const Box = ({ heading, value }: { heading: string; value: string }) => {
	return (
		<div className={styles.Box}>
			<span>{heading}</span>
			<span>{value}</span>
		</div>
	)
}
