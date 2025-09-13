interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const EmptyState = ({ title, description, icon }: EmptyStateProps) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center text-center max-w-md">
        {icon && <div className="mb-4">{icon}</div>}

        <h3 className="text-lg mb-2">{title}</h3>

        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export { EmptyState };
