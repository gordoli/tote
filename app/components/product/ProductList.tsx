import { Product } from "../../lib/types";

import ProductCard from "./ProductCard";
import LoadingScreen from "../LoadingScreen";
import EmptyState from "../EmptyState";
import { ScrollView } from "../Themed";

const ProductList = ({ products }: { products: Product[] | null }) => {
  if (!products) {
    return <LoadingScreen />;
  }

  return !products || products.length === 0 ? (
    <EmptyState label="No products found" />
  ) : (
    <ScrollView className="h-screen">
      {products &&
        products.map((product: Product, i: number) => (
          <ProductCard key={i} product={product} />
        ))}
    </ScrollView>
  );
};

export default ProductList;
