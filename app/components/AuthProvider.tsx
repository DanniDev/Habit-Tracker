"use client";
import { SessionProvider } from "next-auth/react";
import ReduxProvider from "@/lib/redux/ReduxProvider";

import React from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </SessionProvider>
  );
};
