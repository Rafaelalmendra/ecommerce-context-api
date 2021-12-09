import { memo } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { useCartContext } from 'commom/context/cart';
import { Container } from './styles';

function Produto({ nome, foto, id, valor, unidade }) {
  const { cart, addProduct, removeProduct } = useCartContext();
  const productInCart = cart.find(product => product.id === id);

  return (
      <Container>
        <div>
          <img
            src={`/assets/${foto}.png`}
            alt={`foto de ${nome}`}
          />
          <p>{nome} - R$ {valor?.toFixed(2)} <span>Kg</span></p>
        </div>
        <div>
          <IconButton 
            color="secondary"
            onClick={() => removeProduct(id)}
            disabled={!productInCart}
          >
            <RemoveIcon />
          </IconButton>
          {productInCart ? productInCart.quantidade : 0}
          <IconButton 
            color="primary"
            onClick={() => addProduct({ nome, foto, id, valor, unidade })}
          >
            <AddIcon />
          </IconButton>
        </div>
      </Container>
  )
}

export default memo(Produto);