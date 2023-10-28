import Card from "./card";
function Cart_cards({
  products,
  deleteItemFromCart,
  count,
  priceSummary,
  setpriceSummary,
  originalData,
}) {
  return (
    <>
      {products.map((product, i) => {
        return (
          <Card
            originalData={originalData}
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
