"use client";
import { SessionProvider } from "next-auth/react";

import React from 'react'
import Session from "redux-persist/lib/storage/session";

export const AuthProvider = ({children} : {children:React.ReactNode}) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}
