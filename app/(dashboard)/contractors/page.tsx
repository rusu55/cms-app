import prisma from "@/prisma/prisma";
import { ContractorsBillboard } from "./components/contractors-billboard";

const page = async () => {
  const contractors = await prisma.contractor.findMany({}); 
  return <ContractorsBillboard />;
};

export default page;
