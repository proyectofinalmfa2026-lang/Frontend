"use client";

import React from "react";
import cn from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export const Button = ({
  variant = "default",
  className = "",
  ...props
}: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center font-semibold cursor-pointer transition-all duration-200 rounded-full px-4 py-2";

  const variants: Record<string, string> = {
    default:
      "bg-linear-to-t from-[#c13a82] to-[#8c63c9] cursor-pointer text-white",
    outline: "border border-[#22194a] text-[#d6d0dc] bg-transparent",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  );
};

export default Button;
