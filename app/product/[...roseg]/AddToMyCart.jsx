"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import addToCart from "../../functions/addToCart";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
function AddToMyCart({ collectionName, id }) {
  const router = useRouter()
  async function handleADD(collectionName, id) {
    let res = await addToCart(collectionName, id);
    res.status == 401 && router.push("/logIn/QCqsf8q9")
  }
  return (
    <Theme>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <button className="bg-secondary text-white hover:bg-secondaryLight  transition rounded-lg font-bold p-2 w-full">
            <p>ADD TO CART</p>
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Content className="select-none" style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Adding item</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to Add this item to your cart?
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={() => handleADD(collectionName, id)}
              >
                Add
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Theme>
  );
}

export default AddToMyCart;
