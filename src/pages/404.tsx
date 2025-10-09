import React from "react";
import Image from "next/image";
import Link from "next/link";

const NotFOund = () => {
  return (
    <div>
      <Image src="/404.jpg" alt="404" width={500} height={500} />
      <p className="text-3xl font-bold text-center text-red-500">
        404 Not Found
      </p>
      <p className="text-lg font-medium text-center text-gray-500">
        The page you are looking for does not exist.
      </p>
      <p className="text-md font-medium text-center text-gray-500">
        Please check the URL or go back to the home page.
      </p>
      <Link href="/" className="text-md font-medium text-center text-blue-500">
        Go back to home
      </Link>
    </div>
  );
};

export default NotFOund;
