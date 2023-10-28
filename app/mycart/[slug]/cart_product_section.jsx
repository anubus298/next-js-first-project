"use client";
import Cart_empty from "./cart_empty";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Table } from "@radix-ui/themes";
import TableHeader from "./(components)/TableHeader";
import Cart_cards from "./cart_cards";
function Cart_product_section({
  id,
  products,
  count,
  priceSummary,
  setpriceSummary,
}) {
  async function deleteItemFromCart(deleteThisProduct, sign) {
    const reg = /(Pro)(\w*)/;
    const collectionName = deleteThisProduct.collectionName.replace(
      reg,
      (str, p1, p2) => {
        return p1.toLowerCase() + "duct_" + p2.toLowerCase() + sign;
      }
    );
    let requestBody = {};
    requestBody[collectionName] = deleteThisProduct.id;
    const res = fetch("http://localhost:3000/api/products/UpdateCart", {
      cache : "no-cache",
      method: "PATCH",
      "Content-Type": "application/json",
      body: JSON.stringify(requestBody),
      headers: {
        id: id,
      },
    });
  }
  return (
    <Theme>
      <div className="min-h-[250px] me-5 select-none">
        {!products && <Cart_empty />}
        {products && count != 0 && (
          <Table.Root>
            <TableHeader />
            <Table.Body>
              <Cart_cards
                deleteItemFromCart={deleteItemFromCart}
                products={products}
                count={count}
                setpriceSummary={setpriceSummary}
                priceSummary={priceSummary}
              />
            </Table.Body>
          </Table.Root>
        )}
      </div>
    </Theme>
  );
}

export default Cart_product_section;
