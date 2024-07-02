import { ClientsBillboard } from "../components/clients-bilboard";
import prisma from "@/prisma/prisma";

const ClientsPage = async ({ params }: { params: { year: string } }) => {
  const clients = await prisma.client.findMany({
    where: {
      weddingDate: {
        gte: new Date(params.year + "-01-01").toISOString(),
        lte: new Date(params.year + "-12-31").toISOString(),
      },
    },
  });

  return (
    <>
      <ClientsBillboard clients={clients} />
    </>
  );
};

export default ClientsPage;
