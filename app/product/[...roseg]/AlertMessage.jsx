"use client";

import { useEffect, useState } from "react";

function AlertMessage({ type }) {
  const [content, setcontent] = useState("");

  useEffect(() => {
    switch (type) {
      case "success":
        setcontent("The item ha been successfully added to your cart.");
        break;
      case "error":
        setcontent("An error happened during the process.");
        break;
      case "info":
        setcontent("You have to login first...");
        break;
    }
  }, []);
  return <p className="">{content}</p>;
}

export default AlertMessage;
