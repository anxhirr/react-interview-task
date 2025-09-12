import { InventoryPage } from "@/components/InventoryPage";
import { getJobAction } from "@/lib/actions";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string; categoryId: string }>;
};

const Page = async ({ params }: Props) => {
  const { id, categoryId } = await params;
  if (!id || !categoryId) return notFound();

  const job = await getJobAction(id);

  if (!job) return notFound();

  return <InventoryPage job={job} categoryId={categoryId} />;
};

export default Page;
