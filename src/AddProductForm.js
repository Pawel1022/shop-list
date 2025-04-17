import { useState } from 'react'
import { Button } from './Button'

export function AddProductForm({ onAddProduct, editingProduct, onToggleForm, onUpdateProduct, onSetEditingProduct }) {
	const [productName, SetProductName] = useState(editingProduct?.name || '')
	const [productQuantity, SetProductQuantity] = useState(editingProduct?.quantity || 0)
	const [productCategory, SetProductCategory] = useState(editingProduct?.category || 'vegetables')

	const emojiMap = {
		vegetables: '🥦',
		fruits: '🍎',
		meat: '🥩',
		dairy: '🧀',
		bakery: '🍞',
		drinks: '🥤',
		snacks: '🍪',
		cleaning: '🧽',
		other: '📦',
	}

	function submitForm() {
		if (!productName || !productQuantity || !productCategory) return
		const product = {
			id: editingProduct ? editingProduct.id : crypto.randomUUID(),
			name: productName,
			category: productCategory,
			quantity: productQuantity,
			emoji: emojiMap[productCategory],
			bought: editingProduct ? editingProduct.bought : false,
		}
		SetProductName('')
		SetProductQuantity(0)
		SetProductCategory('vegetables')

		if (editingProduct) {
			onUpdateProduct(product)
		} else {
			onAddProduct(product)
		}

		onToggleForm()
	}

	return (
		<>
			<form
				onSubmit={e => {
					e.preventDefault()
					submitForm()
					onSetEditingProduct(null)
				}}>
				<div>
					<label>Product:</label>
					<input type='text' value={productName} onChange={e => SetProductName(e.target.value)}></input>
				</div>
				<div>
					<label>Quantity:</label>
					<input
						type='number'
						min={0}
						value={productQuantity}
						onChange={e => SetProductQuantity(+e.target.value)}></input>
				</div>
				<div>
					<label>Category:</label>
					<select value={productCategory} onChange={e => SetProductCategory(e.target.value)}>
						<option value='vegetables'>🥦 Vegetables</option>
						<option value='fruits'>🍎 Fruits</option>
						<option value='meat'>🥩 Meat</option>
						<option value='dairy'>🧀 Dairy</option>
						<option value='bakery'>🍞 Bakery</option>
						<option value='drinks'>🥤 Drinks</option>
						<option value='snacks'>🍪 Snacks</option>
						<option value='cleaning'>🧽 Cleaning</option>
						<option value='other'>📦 other</option>
					</select>
				</div>
				<Button className='success'>{editingProduct ? 'Save 💾' : 'Add ✅'}</Button>
			</form>
		</>
	)
}
