import { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';

//material-ui
import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

//context
import { useCartContext } from 'commom/context/cart';
import { usePaymentContext } from 'commom/context/payment';
import { UserContext } from 'commom/context/user';

//components
import Produto from 'components/Produto';

//styles
import { Container, Voltar, TotalContainer, PagamentoContainer} from './styles';

function Carrinho() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { cart, valueTotalCart, buy } = useCartContext();
  const { saldo = 0 } = useContext(UserContext)
  const { typePayment , paymentMethod, changePayment } = usePaymentContext();
  const total = useMemo(() => saldo - valueTotalCart, [saldo, valueTotalCart]);
  const history = useHistory();

  return (
    <Container>
      <Voltar onClick={() => history.goBack()} />
      <h2>Carrinho</h2>
      {cart.map(product => (
        <Produto {...product} key={product.id} />
      ))}
      <PagamentoContainer>
        <InputLabel>Forma de Pagamento</InputLabel>
        <Select
          value={paymentMethod.id}
          onChange={(event) => changePayment(event.target.value)}
        >
          {typePayment.map(payment => (
            <MenuItem value={payment.id} key={payment.id}>
              {payment.name}
            </MenuItem>
          ))}
        </Select>
      </PagamentoContainer>
      <TotalContainer>
          <div>
            <h2>Total no Carrinho: </h2>
            <span>R$ {valueTotalCart.toFixed(2)}</span>
          </div>
          <div>
            <h2> Saldo: </h2>
            <span> R$ {Number(saldo).toFixed(2)}</span>
          </div>
          <div>
            <h2> Saldo Total: </h2>
            <span> R$ {total.toFixed(2)}</span>
          </div>
        </TotalContainer>
      <Button
        onClick={() => {buy(); setOpenSnackbar(true);}}
        disabled={total < 0 || cart.length === 0}
        color="primary"
        variant="contained"
      >
         Comprar
       </Button>
        <Snackbar
          anchorOrigin={
            { 
              vertical: 'top',
              horizontal: 'right'
            }
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
           <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
          >
            Compra feita com sucesso!
          </MuiAlert>
        </Snackbar>
    </Container>
  )
}

export default Carrinho;