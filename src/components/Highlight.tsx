import { PropsWithChildren } from "react";

interface HighlightProps extends PropsWithChildren {}

export const Highlight = ({ children }: HighlightProps) => {
  return <span className="text-coral">{children}</span>;
};
