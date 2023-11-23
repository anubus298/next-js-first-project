"use client";
import IsValidProvider from "./(lib)/context-provider";

export default function Providers({ children }) {
  return <IsValidProvider>{children}</IsValidProvider>;
}
