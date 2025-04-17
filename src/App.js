import { useState } from 'react'
import { Header } from './Header'
import { AddProductForm } from './AddProductForm'
import { Button } from './Button'
import { ShopList } from './ShopList'
import { Browser } from './Browser'
import { Stats } from './Stats'
import { initalProducts } from './initalProducts'

export default function App() {
	const [products, SetProducts] = useState(initalProducts)
	const [formIsOpen, SetFormIsOpen] = useState(false)
	const [editingProduct, SetEditingProduct] = useState(null)
	const [filter, SetFilter] = useState('all')
	const [search, SetSearch] = useState('')

	function toggleForm() {
		SetFormIsOpen(!formIsOpen)
	}

	function deleteProduct(productToDelete) {
		const confirm = window.confirm(`Are you soure to delete this ${productToDelete.name} from your shop list? `)
		if (!confirm) return
		SetProducts(products => [...products].filter(product => product.id !== productToDelete.id))
	}

	function addProduct(productToAdd) {
		SetProducts(products => [...products, productToAdd])
		toggleForm()
	}

	function toggleBought(id) {
		SetProducts(products =>
			products.map(product => (product.id === id ? { ...product, bought: !product.bought } : product))
		)
	}

	function updateProduct(productToUpdate) {
		SetProducts(products => products.map(product => (product.id === productToUpdate.id ? productToUpdate : product)))
	}

	function clearList() {
		SetProducts([])
	}

	return (
		<div className='App'>
			<Header> 🛒 SHOP LIST </Header>
			<div className='control'>
				<Button onClick={toggleForm}>{formIsOpen ? 'Close ❌' : 'Add new item ➕'}</Button>
				<Browser onSetFilter={SetFilter} search={search} onSetSearch={SetSearch} />
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
				onFilter={filter}
				onSearch={search}
			/>
			<Stats products={products} onClearList={clearList} />
		</div>
	)
}
