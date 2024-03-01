import { Product } from '../components/ProductList';
import ProductList from '../components/ProductList';
type ProductPageProps = {
  productList: Product[];
  onCreatedProduct: (product: Product) => void;
  onModifyProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
  isProductModalOpen: boolean;
  setIsProductModalOpen: (isProductModalOpen: boolean) => void;
};
export default function ProductPage(props: ProductPageProps) {
  const { productList, onModifyProduct,  onDeleteProduct, onCreatedProduct, isProductModalOpen, setIsProductModalOpen } = props;
  return <ProductList products={productList} onModifyProduct={onModifyProduct} onDeleteProduct={onDeleteProduct} isProductModalOpen={isProductModalOpen} setIsProductModalOpen={setIsProductModalOpen} onCreateProduct={onCreatedProduct} />;
}
