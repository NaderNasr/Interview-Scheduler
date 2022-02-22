import React from "react";

import "components/Button.scss";

export default function Button({ confirm, children, danger, disabled, onClick }) {
   let buttonClass = "button";

   if (confirm) {
      buttonClass += " button--confirm";
   }

   if (danger) {
      buttonClass += " button--danger";
   }

   return (
      <button
        className={buttonClass}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
}
