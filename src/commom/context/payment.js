import { useContext } from "react";
import { createContext, useState } from "react";

export const PaymentContext = createContext();
PaymentContext.displayName = "Pagamento";

export const PaymentProvider = ({ children }) => {
  const typePayment = [
    {
      name: "Boleto",
      fees: 1,
      id: 1
    },
    {
      name: "Cartão de crédito",
      fees: 1.3,
      id: 2
    },
    {
      name: "Pix",
      fees: 1,
      id: 3
    },
    {
      name: "Crediário",
      fees: 1,
      id: 4
    }
  ];

  const [ paymentMethod, setPaymentMethod ] = useState(typePayment[0]);
  
  return (
    <PaymentContext.Provider value={{ typePayment, paymentMethod, setPaymentMethod }}>
      {children}
    </PaymentContext.Provider>
  )
};

export const usePaymentContext = () => {
  const { typePayment, paymentMethod, setPaymentMethod } = useContext(PaymentContext);

  function changePayment(id) {
    const currentPayment = typePayment.find(payment => payment.id === id);
    setPaymentMethod(currentPayment);
  }

  return {
    typePayment,
    paymentMethod,
    changePayment
  }
}