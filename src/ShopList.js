import { ProductItem } from './ProductItem'

export function ShopList({
	products,
	onDeleteProduct,
	onToggleBought,
	onSetEditingProduct,
	onToggleForm,
	onFilter,
	onSearch,
}) {
	const sortedProducts =
		onFilter === 'all'
			? products
			: onFilter === 'bought'
			? products.filter(product => product.bought)
			: products.filter(product => !product.bought)

	return (
		<div>
			<ul>
				{sortedProducts
					.filter(product => product.name.toLowerCase().includes(onSearch.toLowerCase()))
					.map(product => (
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
