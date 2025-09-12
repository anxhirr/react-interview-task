import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const NotFoundComponent = () => {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you are looking for does not exist.
        </p>
        <Link href="/job/list/in_progress">
          <Button>
            <ArrowLeft />
            Back to Job Sites
          </Button>
        </Link>
      </div>
    </div>
  );
};

export { NotFoundComponent };
