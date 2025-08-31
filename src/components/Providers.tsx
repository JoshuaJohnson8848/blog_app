"use client";

import { ConfirmProvider } from "material-ui-confirm";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ConfirmProvider>{children}</ConfirmProvider>;
}
