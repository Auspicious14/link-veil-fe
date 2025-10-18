import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";

const LinkPage = () => {
  const router = useRouter();
  const { shortId } = router.query;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const linkUrl = shortId && apiUrl ? `${apiUrl}/links/${shortId}` : "";

  return (
    <div>
      <Head>
        <title>Link</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      {
        <iframe
          src={linkUrl}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          title="Content"
        />
      }
    </div>
  );
};

export default LinkPage;