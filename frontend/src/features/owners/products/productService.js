import axios from 'axios'
const API_URL = '/api/owners/products'

const getOwnerProducts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  if (response.data) {
    return response.data
  }
}

const productService = {
  getOwnerProducts,
}

export default productService
