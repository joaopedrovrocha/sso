import { PropsWithChildren } from "react";

export function PageSubTitle({ children }: PropsWithChildren) {
  return (
    <p className="mt-2 text-sm leading-8 text-gray-600">
      {children}
    </p>
  )
}