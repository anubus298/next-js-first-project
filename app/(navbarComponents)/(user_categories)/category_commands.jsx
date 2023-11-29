"use client";

import { Badge } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import commandsAtom from "../../(lib)/jotai/commandsAtom";

function Category_commands() {
  const [commandsCountAtom, setcommandsCountAtom] = useAtom(commandsAtom);
  const router = useRouter();
  return (
    <div
      className="p-1 flex items-center gap-x-2 cursor-pointer transition ease-out"
      onClick={() => {
        setcommandsCountAtom(0);
        router.push("/commands");
      }}
    >
      <Badge size="small" count={commandsCountAtom}>
        <FontAwesomeIcon className="text-white" icon={faBox} />
      </Badge>
      <p>Commands</p>
    </div>
  );
}

export default Category_commands;
