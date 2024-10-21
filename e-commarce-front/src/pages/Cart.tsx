import useCart from "@hooks/useCart";
import { Heading } from "@components/common/Header";
import { LottieHandler } from '@components/feedback/layout';
import { Loading } from "@components/feedback/layout";
import { CartSubtotalPrice } from '../components/ecommerce/headerbasket/index';
import CartItemList from "@components/ecommerce/headerbasket/carditemlist/CardItemList";

const Cart = () => {
  const {loading, error, products, changeQuantityHandler, removeItemHandler, userAccessToken, placeOrderStatus} = useCart();

  return (
    <>
      <Heading title={`Your Cart`}></Heading>
      <Loading loading={loading} error={error} type='cart'>
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotalPrice products={products}  userAccessToken={userAccessToken}  />
          </> 
        ) : placeOrderStatus === "succeeded" ? (
          <LottieHandler
            message="Your order has been placed successfully"
            type="success"
          />
        ) : (
          <LottieHandler message="Your cart is empty" type="empty" />
        )}
          </Loading>
    </>
  );
};

export default Cart;