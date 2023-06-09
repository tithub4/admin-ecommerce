import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from 'next-auth/providers/email'

const adminEmails = ["titou.hellegouarch@gmail.com", "memoriodrive@gmail.com"];

export const authOptions = {
	providers: [
		// OAuth authentication providers...
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		// Passwordless / email sign in
		// EmailProvider({
		//   server: process.env.MAIL_SERVER,
		//   from: 'NextAuth.js <no-reply@example.com>'
		// }),
	],
	secret: process.env.NEXT_PUBLIC_SECRET,
	adapter: MongoDBAdapter(clientPromise),
	callbacks: {
		session: ({ session, token, user }) => {
			if (adminEmails.includes(session?.user?.email)) {
				return session;
			} else {
				return false;
			}
		},
	},
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
	const session = await getServerSession(req, res, authOptions);
	if (!adminEmails.includes(session?.user?.email)) {
		res.status(401);
		res.end();
		throw "not an admin";
	}
}
