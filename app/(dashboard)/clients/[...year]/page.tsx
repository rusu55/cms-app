import { ClientsBillboard } from "../components/clients-bilboard";
import prisma from "@/prisma/prisma";

const ClientsPage = async ({params}: {params: {year: string}}) => {
  const clients = await prisma.client.findMany({
    wher
  })
  return (
    <>
      <ClientsBillboard/>
    </>
  )
}

export default ClientsPage