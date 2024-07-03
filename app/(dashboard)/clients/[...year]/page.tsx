"use client";
import { ClientsBillboard } from "../components/clients-bilboard";
import { useGetClients } from "../hooks/use-get-clients";
//import prisma from "@/prisma/prisma";

const ClientsPage = ({ params }: { params: { year: string } }) => {
  const { data: clients, isLoading } = useGetClients();
  console.log(clients);
  //const clients = await prisma.client.findMany({
  // where: {
  //   weddingDate: {
  //     gte: new Date(params.year + "-01-01").toISOString(),
  //    lte: new Date(params.year + "-12-31").toISOString(),
  //   },
  //  },
  // });

  return (
    <>
      <ClientsBillboard clients={clients} />
    </>
  );
};

export default ClientsPage;
