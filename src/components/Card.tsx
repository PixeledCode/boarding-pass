export const Card = ({ value, image }: any) => {
	return (
		<div className="Card">
			{value && (
				<>
					<div>
						{value.firstName} {value.lastName}
					</div>
					<div>{value.pnr}</div>
					<div>{value.flightCode}</div>
					<div>{value.date}</div>
					<div>{value.flightTime}</div>
					<div>{value.seat}</div>
					<div>{value.cabin}</div>
					<div>{value.squence}</div>
					<img src={image} alt="boarding pass barcode" />
				</>
			)}
		</div>
	)
}
