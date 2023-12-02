import Card from "./card";
function Cart_cards({
  products,
  deleteItemFromCart,
  arrayOfproductCounts,
  setarrayOfproductCounts,
}) {
  return (
    <>
      {products.map((product, i) => {
        return (
          <Card
            i={i}
            arrayOfproductCounts={arrayOfproductCounts}
            setarrayOfproductCounts={setarrayOfproductCounts}
            deleteItemFromCart={deleteItemFromCart}
            product={product}
            key={product.id + i + 2 * i}
          />
        );
      })}
    </>
  );
}

export default Cart_cards;
