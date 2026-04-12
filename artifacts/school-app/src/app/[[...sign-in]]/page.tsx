"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const role = (user?.publicMetadata.role as string | undefined) || "admin";
    router.replace(`/${role}`);
  }, [isLoaded, isSignedIn, user, router]);

  if (isLoaded && isSignedIn) {
    return (
      <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
        <div className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-4 items-center">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Image src="/logo.png" alt="" width={24} height={24} />
            Saltech Edu
          </h1>
          <h2 className="text-gray-400">Opening your dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <div className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-4 items-center">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Image src="/logo.png" alt="" width={24} height={24} />
          Saltech Edu
        </h1>
        <h2 className="text-gray-400">Sign in to your account</h2>
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none p-0 w-full",
            },
          }}
        />
      </div>
    </div>
  );
};

export default LoginPage;
