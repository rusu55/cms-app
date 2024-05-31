"use client";
import { useUser } from "@clerk/nextjs";

export const WelcomeMsg = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className=" space-y-2 mb-4">
      <h2 className="text-2xl text-white font-medium">
        Welcome Back {isLoaded ? ", " : ""}
        {user?.firstName}
      </h2>
      <p className=" text-base text-[#89b6fd]">For Reviewing....</p>
    </div>
  );
};
