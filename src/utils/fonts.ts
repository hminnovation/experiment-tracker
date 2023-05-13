import { Courier_Prime } from "next/font/google";

const courierPrime = Courier_Prime({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-courier-prime",
});

export const withCourierPrime = (cls: string) =>
  `${cls} ${courierPrime.className}`;
