import Card from "./card";
function Cart_cards({
  products,
  deleteItemFromCart,
  priceSummary,
  setpriceSummary,
}) {
  return (
    <>
      {products.map((product, i) => {
        return (
          <Card
            deleteItemFromCart={deleteItemFromCart}
            setpriceSummary={setpriceSummary}
            priceSummary={priceSummary}
            product={product}
            key={product.id + i + 2 * i}
          />
        );
      })}
    </>
  );
}

export default Cart_cards;
