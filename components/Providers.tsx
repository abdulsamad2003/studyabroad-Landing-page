"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AttributionRestore from "@/components/shared/AttributionRestore";
import { queryClient } from "@/lib/queryClient";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AttributionRestore />
      {children}
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}
