import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { usePaymentContext } from './payment';
import { UserContext } from './user';

export const CartContext = createContext();
CartContext.displayName = 'Carrinho';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [ amountProducts, setAmountProducts ] = useState(0);
  const [ valueTotalCart, setValueTotalCart ] = useState(0);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        amountProducts,
        setAmountProducts,
        valueTotalCart,
        setValueTotalCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const { 
    cart,
    setCart,
    amountProducts,
    setAmountProducts,
    valueTotalCart,
    setValueTotalCart
  } = useContext(CartContext);

  const { paymentMethod } = usePaymentContext();
  const { setSaldo } = useContext(UserContext);

  function changeQuantity(id, quantidade) {
    return cart.map(cartItem => {
      if (cartItem.id === id) cartItem.quantidade += quantidade;
      return cartItem;
    });
  }

  function addProduct(newProduct) {
    const haveProduct = cart.some(cartItem => cartItem.id === newProduct.id);
    if (!haveProduct) {
      newProduct.quantidade = 1;
      return setCart(cartPrevious => [...cartPrevious, newProduct]);
    }
    setCart(changeQuantity(newProduct.id, 1));
  };

  function removeProduct(id) {
    const product = cart.find(cartItem => cartItem.id === id);
    const theLast = product.quantidade === 1;
    if(theLast) {
      return setCart(cartPrevious => 
        cartPrevious.filter(cartItem => cartItem.id !== id)
      );
    }
    setCart(changeQuantity(id, -1));
  };

  function buy() {
    setCart([]);
    setSaldo(saldoAtual => saldoAtual - valueTotalCart);
  }

  useEffect(() => {
    const {newAmount, newTotal} = cart.reduce((count, product) => ({
        newAmount: count.newAmount + product.quantidade,
        newTotal: count.newTotal + (product.valor * product.quantidade)
      }), {
      newAmount: 0,
      newTotal: 0
    });
    setAmountProducts(newAmount);
    setValueTotalCart(newTotal * paymentMethod.fees);
  }, [cart, setAmountProducts, setValueTotalCart, paymentMethod]);

  return {
    cart,
    setCart,
    addProduct,
    removeProduct,
    amountProducts,
    setAmountProducts,
    valueTotalCart,
    buy
  };
};