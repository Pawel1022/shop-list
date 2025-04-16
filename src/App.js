import { useState } from 'react'
import { Header } from './Header'

const initalProducts = [
	{
		id: 1,
		name: 'Chips',
		category: 'snacks',
		quantity: 2,
		emoji: '🍪',
		bought: false,
	},
	{
		id: 2,
		name: 'Cola',
		category: 'drinks',
		quantity: 5,
		emoji: '🥤',
		bought: true,
	},
	{
		id: 3,
		name: 'Chicken',
		category: 'meat',
		quantity: 1,
		emoji: '🥩',
		bought: true,
	},
]

export default function App() {
	const [products, SetProducts] = useState(initalProducts)
	const [formIsOpen, SetFormIsOpen] = useState(false)
	const [editingProduct, SetEditingProduct] = useState(null)

	function toggleForm() {
		SetFormIsOpen(!formIsOpen)
	}

	function deleteProduct(productToDelete) {
		const confirm = window.confirm(`Are you soure to delete this ${productToDelete.name} from your shop list? `)
		if (!confirm) return
		SetProducts(products => [...products].filter(product => product.id !== productToDelete.id))
	}

	function addProduct(productToAdd) {
		SetProducts(products => [...products, productToAdd].map(product => product))
		toggleForm()
	}

	function toggleBought(id) {
		SetProducts(products =>
			products.map(product => (product.id === id ? { ...product, bought: !product.bought } : product))
		)
	}

	function updateProduct(productToUpdate) {
		SetProducts(products =>
			[...products].map(product => (product.id === productToUpdate.id ? productToUpdate : product))
		)
	}

	function clearList() {
		SetProducts([])
	}

	return (
		<div className='App'>
			<Header> 🛒 SHOP LIST </Header>
			<div className='control'>
				<Button onClick={toggleForm}>{formIsOpen ? 'Close ❌' : 'Add new item ➕'}</Button>
				<Browser />
			</div>
			{formIsOpen && (
				<AddProductForm
					onAddProduct={addProduct}
					editingProduct={editingProduct}
					onToggleForm={toggleForm}
					onUpdateProduct={updateProduct}
					onSetEditingProduct={SetEditingProduct}
				/>
			)}
			<ShopList
				products={products}
				onDeleteProduct={deleteProduct}
				onToggleBought={toggleBought}
				onSetEditingProduct={SetEditingProduct}
				onToggleForm={toggleForm}
			/>
			<Stats products={products} onClearList={clearList} />
		</div>
	)
}

function AddProductForm({ onAddProduct, editingProduct, onToggleForm, onUpdateProduct, onSetEditingProduct }) {
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

function Button({ children, onClick, className }) {
	return (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	)
}

function ShopList({ products, onDeleteProduct, onToggleBought, onSetEditingProduct, onToggleForm }) {
	return (
		<div>
			<ul>
				{products.map(product => (
					<ProductItem
						product={product}
						onDeleteProduct={onDeleteProduct}
						onToggleBought={onToggleBought}
						onSetEditingProduct={onSetEditingProduct}
						onToggleForm={onToggleForm}
						key={product.id}
					/>
				))}
			</ul>
		</div>
	)
}

function ProductItem({ product, onDeleteProduct, onToggleBought, onSetEditingProduct, onToggleForm }) {
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

function Browser() {
	return (
		<>
			<div className='control'>
				<h2>Find product 🔍</h2>
				<input type='text' placeholder='🔍 Search...'></input>
			</div>
			<div className='control'>
				<h2>Filter 📁</h2>
				<select>
					<option value='all'>All</option>
					<option value='bought'>🛒 Bought</option>
					<option value='tobuy'>✘</option>
				</select>
			</div>
		</>
	)
}

function Stats({ products, onClearList }) {
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
