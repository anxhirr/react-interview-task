type Props = {
  params: Promise<{ id: string }>;
};

export default async function InventoryPage({ params }: Props) {
  const { id } = await params;
  return `Inventory Page ${id}`;
}
