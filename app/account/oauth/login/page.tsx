"use client";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";

export default function OauthLoginPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(status);
    if (!(status === "loading") && !session) void signIn("google");
    if (session) {
      window.close();
    }
  }, [status, session]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        left: 0,
        top: 0,
        background: "white",
      }}
    ></div>
  );
}
