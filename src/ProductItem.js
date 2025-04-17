import { Button } from './Button'

export function ProductItem({ product, onDeleteProduct, onToggleBought, onSetEditingProduct, onToggleForm }) {
	return (
		<li className={product.bought ? 'bought' : ''}>
			<span>{product.emoji}</span>
			<span>{product.name}</span>
			<span>x{product.quantity}</span>
			<input
				type='checkbox'
				onChange={() => {
					onToggleBought(product.id)
				}}
				checked={product.bought}></input>
			<Button onClick={() => onDeleteProduct(product)} className='danger'>
				🗑️
			</Button>
			<Button
				onClick={() => {
					onSetEditingProduct(product)
					onToggleForm()
				}}>
				✏️
			</Button>
		</li>
	)
}
