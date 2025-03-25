"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

const buttonStyle =
  "text-white font-semibold py-2 px-4 rounded-md  transition duration-200 block w-[400px] text-lg";
const linkStyle = "bg-blue-600 hover:bg-blue-700";
const logoutStyle = "bg-red-600 hover:bg-red-700";

export default function LoginPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <div className="p-20">
      {user ? (
        <>
          <p className="font-semibold text-blue-700 mb-5">
            Welcome, {user.displayName} ({user.email})
          </p>
          <button
            className={`${buttonStyle} ${logoutStyle}`}
            onClick={firebaseSignOut}
          >
            Sign Out
          </button>
          <br />
          <Link href="./week-9/shopping-list">
            <button className={`${buttonStyle} ${linkStyle}`}>
              Go to Shopping List
            </button>
          </Link>
        </>
      ) : (
        <button
          className={`${buttonStyle} ${linkStyle}`}
          onClick={gitHubSignIn}
        >
          Sign in with GitHub
        </button>
      )}
    </div>
  );
}
