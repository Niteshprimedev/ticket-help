import { useLocation } from 'react-router-dom'
import HeaderHome from './HeaderHome'
import HeaderCustomers from './customers/HeaderCustomers'
import HeaderOwners from './owners/HeaderOwners'

function Header() {
  const location = useLocation()

  const renderHeader = {
    homeHeader: () => <HeaderHome></HeaderHome>,
    customerHeader: () => <HeaderCustomers></HeaderCustomers>,
    ownerHeader: () => <HeaderOwners></HeaderOwners>,
  }

  switch (true) {
    case location.pathname === '/':
      return renderHeader.homeHeader()
    case location.pathname.startsWith('/customers'):
      return renderHeader.customerHeader()
    case location.pathname.startsWith('/owners'):
      return renderHeader.ownerHeader()
    default:
      return renderHeader.homeHeader()
  }
}

export default Header
