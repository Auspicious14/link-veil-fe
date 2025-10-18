import React from "react";
import Image from "next/image";
import Link from "next/link";

const NotFOund = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <Image src="/404.jpg" alt="404" width={400} height={400} className="mb-8 rounded-lg shadow-lg" />
      <h1 className="text-5xl font-extrabold text-red-600 mb-4">404 Not Found</h1>
      <p className="text-xl text-gray-700 mb-6">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFOund;
