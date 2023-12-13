"use client";

import Confirmation_success_message from "./confirmation_success_message";
import Confirmation_error_message from "./confirmation_error_message";

function ConfirmationIcon({ statue }) {
  return statue === "success" ? (
    <Confirmation_success_message />
  ) : (
    <Confirmation_error_message />
  );
}

export default ConfirmationIcon;
