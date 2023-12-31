"use client";
import { faFacebook, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import Image from "next/image";
import { usePathname } from "next/navigation";

function ShareButton({ cId, id, url, name }) {
  const pathname = usePathname();
  const sharedUrl =
    "https://safomart.vercel.app" + pathname + "/opengraph-image.js";
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
        className="z-50 select-none"
        style={{ maxWidth: 450 }}
      >
        <AlertDialog.Title>Share</AlertDialog.Title>
        <AlertDialog.Description size="2" c>
          <div className="flex items-center gap-3 p-2 overflow-auto border-2 border-main">
            <Image
              src={`${process.env.pocketBaseUrl}api/files/${cId}/${id}/${url}`}
              alt=""
              height={150}
              width={150}
            />
            <div className="p-1 text-xs bg-gray-100 md:text-inherit">
              <p>
                🚀 Exciting News! 🛍️ Uncover Unbeatable Deals on {name} at
                SafoMart! 🌟
              </p>
              <p>
                Shop smart, shop SafoMart! 🌐
                <span className="text-blue-600">
                  <br /> #SafoMartDeals #SmartShopping <br /> #MustHave
                </span>
              </p>
            </div>
          </div>
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" className="cursor-pointer">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <FacebookShareButton hashtag="#SafoMartDeals" url={sharedUrl}>
              <Button variant="solid" color="blue" className="cursor-pointer">
                <FontAwesomeIcon icon={faFacebook} />
              </Button>
            </FacebookShareButton>
          </AlertDialog.Action>
          <AlertDialog.Action>
            <TwitterShareButton
              url={sharedUrl}
              title={`🚀 Exciting News! 🛍️ Uncover Unbeatable Deals on ${name} at SafoMart! 🌟,
Shop smart, shop SafoMart! 🌐
              `}
              hashtag={["#SafoMartDeals", "#SmartShopping", "#MustHave"]}
            >
              <Button variant="solid" className="bg-black cursor-pointer">
                <FontAwesomeIcon icon={faXTwitter} />
              </Button>
            </TwitterShareButton>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export default ShareButton;
