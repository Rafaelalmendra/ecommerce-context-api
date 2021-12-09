import { useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/logo.svg';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

import { Nav } from './styles';
import { useCartContext } from 'commom/context/cart';

export default function NavBar() {
  const { amountProducts } = useCartContext();
  const history = useHistory();

  return (
    <Nav>
      <Logo />
      <IconButton 
        disabled={amountProducts === 0}
        onClick={() => history.push('/Carrinho')}
      >
        <Badge color="primary" badgeContent={amountProducts}>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  )
};