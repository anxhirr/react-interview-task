import { InventoryPage } from "@/components/InventoryPage";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string; categoryId: string }>;
};

const Page = async ({ params }: Props) => {
  const { id, categoryId } = await params;
  if (!id || !categoryId) return notFound();

  return <InventoryPage id={id} categoryId={categoryId} />;
};

export default Page;
