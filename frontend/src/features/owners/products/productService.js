import api from '../../../api'

const API_URL = '/api/owners/products'

const getOwnerProducts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await api.get(API_URL, config)

  if (response.data) {
    return response.data
  }
}

const productService = {
  getOwnerProducts,
}

export default productService
