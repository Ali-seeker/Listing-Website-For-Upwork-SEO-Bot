import { getServices } from "@/lib/data";
import { ServiceCard } from "@/components/ui/Cards";
import { EmptyState } from "@/components/ui/States";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";

import { SearchBar } from "@/components/ui/SearchBar";

export const metadata = {
  title: "Services | ListingHub",
  description: "Expert consulting, development, and support services.",
};

type Props = {
  searchParams: Promise<{ query?: string }>;
};

export default async function ServicesPage(props: Props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const services = await getServices(query);

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <FadeIn>
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground mb-4">Professional Services</h1>
            <p className="text-muted-foreground text-lg">
              Partner with top-tier professionals to accelerate your growth, build custom solutions, and solve your most complex challenges.
            </p>
          </div>
          <SearchBar placeholder="Search services..." />
        </div>
      </FadeIn>

      {services.length === 0 ? (
        <FadeIn delay={0.2}>
          <EmptyState title="No services found" description="We couldn't find any services at the moment. Please check back later." />
        </FadeIn>
      ) : (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
}
