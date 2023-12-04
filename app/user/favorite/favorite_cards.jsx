import Card_favorite from "./card_favorite";
function Favorite_cards({
  products,
  deleteItemFromCart,
  priceSummary,
  setpriceSummary,
}) {
  return (
    <div className="bg-gray-200">
      {products.map((product, i) => {
        return (
          <Card_favorite
            deleteItemFromCart={deleteItemFromCart}
            setpriceSummary={setpriceSummary}
            priceSummary={priceSummary}
            product={product}
            key={product.id + i + 2 * i}
          />
        );
      })}
    </div>
  );
}

export default Favorite_cards;
