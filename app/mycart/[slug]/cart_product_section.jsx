"use client";
import PocketBase from "pocketbase";
import Cart_empty from "./cart_empty";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Table } from "@radix-ui/themes";
import Cart_cards from "./cart_cards";
function Cart_product_section({
  originalData,
  id,
  products,
  count,
  priceSummary,
  setpriceSummary,
}) {
  async function deleteItemFromCart(deleteThisProduct, origin) {
    const reg = /(Pro)(\w*)/;
    let data = { ...origin };
    const collectionName = deleteThisProduct.collectionName.replace(
      reg,
      (str, p1, p2) => {
        return p1.toLowerCase() + "duct_" + p2.toLowerCase();
      }
    );
    data[collectionName] = data[collectionName].filter((item) => {
      return item != deleteThisProduct.id;
    });
    const res = fetch("http://localhost:3000/api/products/UpdateCart", {
      method: "PATCH",
      "Content-Type": "application/json",
      body: JSON.stringify(data),
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
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>
                  <p className="text-center">Product</p>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  <p className="text-center">Price</p>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  <p className="text-center">Quantity</p>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  <p className="text-center">Total</p>
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Cart_cards
                deleteItemFromCart={deleteItemFromCart}
                originalData={originalData}
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
