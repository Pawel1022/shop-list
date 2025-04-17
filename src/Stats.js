import { Button } from './Button'

export function Stats({ products, onClearList }) {
	const numProducts = products.length
	const numBoughtProducts = products.filter(product => product.bought === true).length

	return (
		<>
			{numProducts > 0 && (
				<div className='stats'>
					<p>
						✅ <span>{numBoughtProducts}</span>/<span>{numProducts}</span> items bought
					</p>
					<Button onClick={() => onClearList()} className='danger'>
						🧹 Clear All
					</Button>
				</div>
			)}
		</>
	)
}
