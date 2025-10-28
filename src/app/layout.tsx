import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>
        <header className="header">
          <div
            style={{ display: "flex", gap: "15px", alignContent: "center", justifyContent: "end" }}
          >
            <SignedOut>
              <SignInButton>
                <button className="btn btn-primary">Sign In</button>
              </SignInButton>
              <SignUpButton>
                <button className="btn btn-primary">Sign Up</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <main className="main">{children}</main>
      </body>
    </html>
  </ClerkProvider>
  );
}
