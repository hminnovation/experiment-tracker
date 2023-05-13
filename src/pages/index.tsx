import Link from "next/link";

import { CustomHead } from "@/components/CustomHead";
import { Highlight } from "@/components/Highlight";
import { withCourierPrime } from "@/utils/fonts";

export default function Home() {
  return (
    <>
      <CustomHead
        title="Torchbox Innovation: NextJS Starter"
        description="A template for Torchbox Innovation experiments using NextJS"
      />
      <div className="max-w-4xl mx-auto my-24 px-10">
        <header className="w-full flex justify-between items-center">
          <h1 className={withCourierPrime("text-3xl tracking-widest mb-4")}>
            Torchbox Innovation: <Highlight>NextJS Starter</Highlight>
          </h1>
        </header>
        <Link
          href="https://ai.torchbox.com"
          className={withCourierPrime("underline underline-offset-4")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Highlight>ai</Highlight>
          .torchbox.com
        </Link>
      </div>
    </>
  );
}
