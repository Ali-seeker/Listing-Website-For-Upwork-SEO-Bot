import { getProducts } from "@/lib/data";
import { ProductCard } from "@/components/ui/Cards";
import { EmptyState } from "@/components/ui/States";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";

export const metadata = {
  title: "Products | ListingHub",
  description: "Browse top-tier software products and tools.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <FadeIn>
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Products</h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Explore our collection of innovative software solutions designed to solve complex problems and boost your team's productivity.
          </p>
        </div>
      </FadeIn>

      {products.length === 0 ? (
        <FadeIn delay={0.2}>
          <EmptyState title="No products found" description="We couldn't find any products at the moment. Please check back later." />
        </FadeIn>
      ) : (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
}
