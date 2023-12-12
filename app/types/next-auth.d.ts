import { DefaultUser, DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      error?: string;
      provider?: string;
      picture: string;
      isVerified: boolean;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    id: string;
    picture: string;
    isVerified: boolean;
    provider?: string;
    error?: string;
  }
}
