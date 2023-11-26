"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
function TotalCell({ deleteItemFromCart, product, quantity }) {
  return (
    <div className="flex flex-col items-center">
      <p className="font-bold text-lg">${product.price * quantity}</p>
      <div className="absolute bottom-1 right-0 ">
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <FontAwesomeIcon
              className="cursor-pointer hover:text-secondary"
              icon={faTrash}
              size="1x"
            />
          </AlertDialog.Trigger>
          <AlertDialog.Content
            className="select-none"
            style={{ maxWidth: 450 }}
          >
            <AlertDialog.Title className="font-black">Deleting item</AlertDialog.Title>
            <AlertDialog.Description className="font-semibold" size="2">
              Are you sure you want to delete this item from your cart?
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button className="font-semibold cursor-pointer" variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button
                  variant="solid"
                  className="font-semibold cursor-pointer"
                  color="red"
                  onClick={() => deleteItemFromCart(product, "-")}
                >
                  Delete
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </div>
    </div>
  );
}

export default TotalCell;
