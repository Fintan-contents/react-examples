import { WithTanStackQuery } from "./WithTanStackQuery";

export default function TodoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <WithTanStackQuery>{children}</WithTanStackQuery>;
}
