import api from '../../../api'

const API_URL = '/api/customers/products'

const getCustomerProductOwners = async (token, productName) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      name: productName,
    },
  }

  const response = await api.get(API_URL, config)

  if (response.data) {
    return response.data
  }
}

const productOwnerService = {
  getCustomerProductOwners,
}

export default productOwnerService
