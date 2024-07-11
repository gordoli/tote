import { Brand } from "../../lib/types";
import EmptyState from "../EmptyState";
import LoadingScreen from "../LoadingScreen";
import { ScrollView } from "../Themed";
import BrandCard from "./BrandCard";

const BrandList = ({ brands }: { brands: Brand[] | null }) => {
  if (!brands) {
    return <LoadingScreen />;
  }

  return !brands || brands.length === 0 ? (
    <EmptyState label="No brands found" />
  ) : (
    <ScrollView>
      {brands &&
        brands.map((brand: Brand, i: number) => (
          <BrandCard key={i} brand={brand} />
        ))}
    </ScrollView>
  );
};

export default BrandList;
