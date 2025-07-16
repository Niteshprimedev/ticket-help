import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOwnerProducts } from '../../features/owners/products/productSlice'
import Spinner from '../../components/assets/Spinner'
import BackButton from '../../components/assets/BackButton'
import ProductItemOwners from '../../components/owners/ProductItemOwners'

function ViewProductOwners() {
  const { products } = useSelector((state) => state.ownersProducts)

  const dispatch = useDispatch()

  // NOTE: only need one useEffect here

  useEffect(() => {
    dispatch(getOwnerProducts())
  }, [dispatch])

  // NOTE: no need for loading state, we can check for absence of products
  // If we don't have products we are loading, if we do have products we just
  // need to update the products with latest products in the background
  if (!products) {
    return <Spinner />
  }

  return (
    <>
      <BackButton isOwner={true} />
      <h1 className='owner'>My Products Offering</h1>
      <div className='tickets owner'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Action</div>
          <div></div>
        </div>
        {products.map((product) => (
          <ProductItemOwners key={product._id} product={product} />
        ))}
      </div>
    </>
  )
}

export default ViewProductOwners
