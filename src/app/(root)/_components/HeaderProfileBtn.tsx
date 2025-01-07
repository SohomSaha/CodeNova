"use client";
import { SignedOut, SignInButton, UserButton,useUser } from "@clerk/nextjs";
import { User } from "lucide-react";

function HeaderProfileBtn() {
  const {user} = useUser();
  console.log(user);
  return (
    <>
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Profile"
            labelIcon={<User className="size-4" />}
            href="/profile"
          />
        </UserButton.MenuItems>
      </UserButton>

      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  );
}
export default HeaderProfileBtn;