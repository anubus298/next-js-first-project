"use client";

import { Badge } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import accountAtom from "../../(lib)/jotai/accountAtom";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { faGear } from "@fortawesome/free-solid-svg-icons";
function Category_account() {
  const router = useRouter();
  const [accountCountAtom, setaccountCountAtom] = useAtom(accountAtom);
  return (
    <div className=" p-1 justify-between flex items-center gap-x-1 cursor-pointer transition ease-out  ">
      <div
        className="flex items-center space-x-2"
        onClick={() => {
          setaccountCountAtom(0);
          router.push("/user/home");
        }}
      >
        <Badge size="small" count={accountCountAtom}>
          <FontAwesomeIcon className="text-white" icon={faGear} />
        </Badge>
        <p>Account</p>
      </div>
    </div>
  );
}

export default Category_account;
