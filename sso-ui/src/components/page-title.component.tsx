import { PropsWithChildren } from "react";

export function PageTitle({ children }: PropsWithChildren) {
  return (
    <h2 className="text-3xl font-bold tracking-tight text-gray-900"> {children} </h2>
  )
}