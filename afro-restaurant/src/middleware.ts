import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      if (!token) return false;
      const role = (token.role as string) ?? "STAFF";
      return role === "ADMIN" || role === "STAFF";
    },
  },
  pages: {
    signIn: "/signin",
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/api/admin/:path*"],
};
