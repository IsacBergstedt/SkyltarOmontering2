"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type QuoteModalContextValue = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
  setOpen: (v: boolean) => void;
};

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <QuoteModalContext.Provider
      value={{
        open,
        setOpen,
        openModal: () => setOpen(true),
        closeModal: () => setOpen(false),
      }}
    >
      {children}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) throw new Error("useQuoteModal must be used inside QuoteModalProvider");
  return ctx;
}
