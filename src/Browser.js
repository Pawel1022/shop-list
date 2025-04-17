export function Browser({ onSetFilter, search, onSetSearch }) {
	return (
		<>
			<div className='control'>
				<h2>Find product 🔍</h2>
				<input
					type='text'
					placeholder='🔍 Search...'
					value={search}
					onChange={e => onSetSearch(e.target.value)}></input>
			</div>
			<div className='control'>
				<h2>Filter 📁</h2>
				<select onChange={e => onSetFilter(e.target.value)}>
					<option value='all'>All</option>
					<option value='bought'>🛒 Bought</option>
					<option value='tobuy'>💰 To buy</option>
				</select>
			</div>
		</>
	)
}
