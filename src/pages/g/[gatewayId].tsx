import Loader from "@/components/common/loader";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Gateway = () => {
  const router = useRouter();
  const { gatewayId } = router.query;

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (gatewayId && apiUrl) {
      window.location.href = `${apiUrl}/links/g/${gatewayId}`;
    }
  }, [gatewayId]);

  return <Loader />;
};

export default Gateway;