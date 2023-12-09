"use client";
import {
  faFacebook,
  faTwitter,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import Image from "next/image";

function ShareButton({ cId, id, url, name }) {
  function handleTwitterShare() {}
  function handleFacebookShare() {}
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger style={{ width: "100%" }}>
        <button
          onClick={() => {}}
          className="bg-main w-1/5 flex justify-center h-[50px] items-center transition rounded-lg md:rounded-s-none font-bold p-2 disabled:text-red-600 text-white"
        >
          <FontAwesomeIcon icon={faArrowUpFromBracket} />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Content
        className="select-none z-50"
        style={{ maxWidth: 450 }}
      >
        <AlertDialog.Title>Adding item</AlertDialog.Title>
        <AlertDialog.Description size="2">
          <div className="flex items-center gap-3 p-2 border-2 border-main">
            <Image
              src={`${process.env.pocketBaseUrl}api/files/${cId}/${id}/${url}`}
              alt=""
              height={150}
              width={150}
            />
            <div className="bg-gray-100 p-1">
              <p>
                🚀 Exciting News! 🛍️ Uncover Unbeatable Deals on {name} at
                SafoMart! 🌟
              </p>
              <p>
                Shop smart, shop SafoMart! 🌐
                <span className="text-blue-600">
                  <br /> #SavoMartDeals #SmartShopping <br /> #MustHave
                </span>
              </p>
            </div>
          </div>
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action onClick={() => handleFacebookShare()}>
            <Button variant="solid" color="blue" className="cursor-pointer">
              <FontAwesomeIcon icon={faFacebook} />
            </Button>
          </AlertDialog.Action>
          <AlertDialog.Action onClick={() => handleTwitterShare()}>
            <Button variant="solid" className="cursor-pointer bg-black">
              <FontAwesomeIcon icon={faXTwitter} className="cursor-pointer" />
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export default ShareButton;
