import React from "react";
import api from "@/lib/axios";

const Gateway = () => {
  return <div>Generating your unique link...</div>;
};

export default Gateway;

export async function getServerSideProps(context: {
  params: { gatewayId: string };
}) {
  const { gatewayId } = context.params;

  const response = await api.get(`/links/g/${gatewayId}`);
  const shortId = response?.data?.shortId;
  return {
    redirect: {
      destination: `${process.env.NEXT_PUBLIC_API_URL}/l/${shortId}`,
      permanent: false,
    },
  };
}
