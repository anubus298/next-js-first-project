"use client";
import Cart_empty from "./cart_empty";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Table } from "@radix-ui/themes";
import TableHeader from "./(components)/TableHeader";
import Favorite_cards from "./favorite_cards";
import { useRouter } from "next/navigation";
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
    const res = await fetch("http://localhost:3000/api/products/UpdateFavorite", {
      method: "PATCH",
      "Content-Type": "application/json",
      body: JSON.stringify(requestBody),
      headers: {
        id: id,
      },
    });
    router.refresh();
  }
  const router = useRouter();
  return (
    <Theme>
      <div className="min-h-[250px]  select-none md:me-5">
        {!products && <Cart_empty />}
        {products && (
          <Table.Root>
            <TableHeader />
            <Table.Body>
              <Favorite_cards
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
