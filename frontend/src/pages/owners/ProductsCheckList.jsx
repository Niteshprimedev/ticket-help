const products = [
  'iPhone',
  'iMac',
  'Macbook Pro',
  'iPad',
  'iPad Pro',
  'iPad Air',
  'AirPods',
  'Apple Watch',
  'Apple TV',
]

export default function ProductsChecklist({
  selectedProducts,
  setSelectedProducts,
}) {
  const handleChange = (e) => {
    const value = e.target.value
    if (e.target.checked) {
      setSelectedProducts((prev) => [...prev, value])
    } else {
      setSelectedProducts((prev) => prev.filter((item) => item !== value))
    }
  }

  return (
    <div className='form-group'>
      <label htmlFor='product' className='owner'>
        Please choose the products linked to your service<span>*</span>
      </label>
      {products.map((product) => (
        <label key={product} className='owner'>
          <input
            className='checkboxes'
            type='checkbox'
            value={product}
            checked={selectedProducts.includes(product)}
            onChange={handleChange}
          />
          {product}
        </label>
      ))}
    </div>
  )
}
