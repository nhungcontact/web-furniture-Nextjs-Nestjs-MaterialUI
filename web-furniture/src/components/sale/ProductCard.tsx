import useProductDetail from "@/hooks/products/useProductDetail";
import ProductCardHover from "../shared/ProductCardHover";

type Props = {
  product: string;
};

export default function ProductCard({ product }: Props) {
  const { data: detailProduct } = useProductDetail(product);
  return <>{detailProduct && <ProductCardHover item={detailProduct} />}</>;
}
