import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
const handler = NextAuth();
export  {handler as GET,handler as POST}