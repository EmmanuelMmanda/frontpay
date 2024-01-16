import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../store/authContext";


const CheckoutButton = ({ order, onSuccess }) => {
  const navigate = useNavigate();
  const { user} = useAuth();

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.price,
          },
        },
      ],
    });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      console.log(details);
      order.task_id = order.id;
      order.payment_id = details.id;
      order.payer_name = details.payer.name.given_name+"_"+details.payer.name.surname;
      order.payer_id = details.payer.payer_id;
      order.payment_time = details.create_time;
      order.status = details.status;
      order.amount = details.purchase_units[0].amount.value;

      console.log('before order',order);
      addPaymentOrder(order);
    });
  };

  //method to add payment to backend
  const addPaymentOrder = async (orderInfoData) => {
    try {
      const response = await axios.post(import.meta.env.VITE_ADD_PAYMENT_URL, orderInfoData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access_token}`,
          'X-Content-Type-Options': 'nosniff', // Prevent MIME sniffing
          'X-Frame-Options': 'DENY', // Prevent clickjacking attacks
          'X-XSS-Protection': '1; mode=block', // Enable XSS protection
          'Referrer-Policy': 'no-referrer', // Reduce information leakage
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload', // Enforce HTTPS
        },
      
      });
  
      const data = response.data;
  
      console.log('response',data);
  
      if (response.status == 201 || response.status == 200) {
        navigate("/tasks");
      } else {
        navigate("/tasks?msg=Failed to add payment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD",
      }}
    >
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </PayPalScriptProvider>
  );
};

export default CheckoutButton;
