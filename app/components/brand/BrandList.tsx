import { ScrollView } from "react-native";
import { Brand } from "../../lib/types";
import BrandCard from "./BrandCard";

const BrandList = ({ brands }: { brands: Brand[] | null }) => {
  return (
    <ScrollView>
      {brands &&
        brands.map((brand: Brand, i: number) => (
          <BrandCard key={i} brand={brand} />
        ))}
    </ScrollView>
  );
};

export default BrandList;
