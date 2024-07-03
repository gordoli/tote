import { Brand } from "../../lib/types";
import LoadingScreen from "../LoadingScreen";
import { ScrollView } from "../Themed";
import BrandCard from "./BrandCard";

const BrandList = ({ brands }: { brands: Brand[] | null }) => {
  if (!brands) {
    return <LoadingScreen />;
  }

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
