import { CreateLinkForm } from "@/modules/links/components/CreateLinkForm";

export default function CreateLinkPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Create a new link</h1>
        <p className="text-muted-foreground mb-8">
          Fill out the form below to create your new private link.
        </p>
        <CreateLinkForm />
      </div>
    </div>
  );
}