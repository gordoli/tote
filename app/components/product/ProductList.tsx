import { ScrollView } from "react-native";
import { Product } from "../../lib/types";

import ProductCard from "./ProductCard";

const ProductList = ({ products }: { products: Product[] | null }) => {
  return (
    <ScrollView>
      {products &&
        products.map((product: Product, i: number) => (
          <ProductCard key={i} product={product} />
        ))}
    </ScrollView>
  );
};

export default ProductList;
