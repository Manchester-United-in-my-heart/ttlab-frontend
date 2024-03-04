import { SlNote } from 'react-icons/sl';
import { MdNavigateNext } from 'react-icons/md';
import { GrPrevious } from 'react-icons/gr';

import { useState, useEffect } from 'react';
import { BiTrash } from 'react-icons/bi';
import ProductModal from '../modals/ProductModal';

export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
};

type ProductListProps = {
  products: Product[];
  onModifyProduct: (product: Product) => void;
  onCreateProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
  isProductModalOpen: boolean;
  setIsProductModalOpen: (isProductModalOpen: boolean) => void;
};

export default function ProductList(props: ProductListProps) {
  const products = props.products;
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const onModifyProduct = props.onModifyProduct;
  const onDeleteProduct = props.onDeleteProduct;
  const [numberOfProductPerPage, setNumberOfProductPerPage] = useState(5);

  const [currentPage, setCurrentPage] = useState(0);
  const pages = Math.ceil(products.length / numberOfProductPerPage);
  let dummyProductListByPage: any[] = [];
  for (let i = 0; i < pages; i++) {
    dummyProductListByPage.push(products.slice(i * numberOfProductPerPage, (i + 1) * numberOfProductPerPage));
  }

  const [productListByPage, setProductListByPage] = useState<Product[]>([]);

  useEffect(() => {
    setCurrentPage(0);
    setProductListByPage(dummyProductListByPage);
  }, [products]);

  useEffect(() => {
    setCurrentPage(0);
    dummyProductListByPage = [];
    for (let i = 0; i < pages; i++) {
      dummyProductListByPage.push(products.slice(i * numberOfProductPerPage, (i + 1) * numberOfProductPerPage));
    }
    setProductListByPage(dummyProductListByPage);
  }, [numberOfProductPerPage]);

  return (
    <>
      {
        // Product Modal
        props.isProductModalOpen && (
          <div className="absolute top-0 left-0 w-screen h-screen bg-[#342b2b53] z-10 flex items-center justify-center">
            <div className="mx-auto my-auto">
              <ProductModal
                product={selectedProduct}
                isOpen={props.isProductModalOpen}
                onClose={() => {
                  props.setIsProductModalOpen(false);
                  setSelectedProduct(undefined);
                }}
                onCreate={props.onCreateProduct}
                onModify={onModifyProduct}
              />
            </div>
          </div>
        )
      }
      {/* Small  */}
      <div className="flex flex-col w-full md:hidden">
        <div className="grid grid-cols-[1fr_1fr_1fr]">
          <div className="text-[#8B909A]">TÊN SẢN PHẨM</div>
          <div className="text-[#8B909A]">ẢNH</div>
          <div className="text-[#8B909A]">HÀNH ĐỘNG</div>
        </div>
        <hr />
        {productListByPage &&
          productListByPage.length > 0 &&
          productListByPage[currentPage].map((product) => (
            <div className="w-full" key={product.id}>
              <div className="grid grid-cols-[1fr_1fr_1fr] py-3">
                <div className="font-semibold">{product.name}</div>
                <div>
                  <img src={product.image} alt="" className="w-10 h-10" />
                </div>
                <div>
                  <button
                    className="px-2 py-1 text-xl text-[#8B909A] rounded-md shadow-none"
                    onClick={() => {
                      props.setIsProductModalOpen(true);
                      setSelectedProduct(product);
                    }}
                  >
                    <SlNote />
                  </button>
                  <button
                    className="px-2 py-1 text-xl text-[#8B909A] rounded-md shadow-none"
                    onClick={() => {
                      onDeleteProduct(product);
                    }}
                  >
                    <BiTrash />
                  </button>
                </div>
              </div>
              <hr />
            </div>
          ))}

        <div>
          <div className="flex justify-between">
            <div>
              Showing{' '}
              <select
                className="px-2 py-1 rounded-md shadow-none"
                onChange={(e) => {
                  setNumberOfProductPerPage(parseInt(e.target.value));
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>{' '}
              of {products.length}
            </div>

            <div className="flex justify-center gap-[3px]">
              <button
                className="px-2 py-1 bg-[#F1F2F6] text-[#8B909A] shadow-none"
                onClick={() => {
                  if (currentPage > 0) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
              >
                <GrPrevious />
              </button>
              {Array.from(Array(pages).keys()).length > 5 ? (
                <button className="px-2 py-1 bg-blue-600 text-white shadow-none" key={currentPage}>
                  {' '}
                  {currentPage + 1}
                </button>
              ) : (
                Array.from(Array(pages).keys()).map((page) => (
                  <button
                    className={`px-2 py-1 shadow-none ${currentPage === page ? 'font-bold bg-blue-600 text-white' : 'bg-[#F1F2F6] text-[#8B909A] '}`}
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                    }}
                  >
                    {page + 1}
                  </button>
                ))
              )}
              <button
                className="px-2 py-1 bg-[#F1F2F6] text-[#8B909A] shadow-none"
                onClick={() => {
                  if (currentPage < pages - 1) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
              >
                <MdNavigateNext />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Medium */}
      <div className="hidden md:full md:flex md:flex-col">
        <div className="grid grid-cols-[2fr_2fr_5fr_2fr_3fr_2fr]">
          <div className="text-[#8B909A]">TÊN SẢN PHẨM</div>
          <div className="text-[#8B909A]">GIÁ</div>
          <div className="text-[#8B909A]">SỐ LƯỢNG</div>
          <div className="text-[#8B909A]">MÔ TẢ</div>
          <div className="text-[#8B909A]">ẢNH</div>
          <div className="text-[#8B909A]">HÀNH ĐỘNG</div>
        </div>
        <hr />

        {productListByPage &&
          productListByPage.length > 0 &&
          productListByPage[currentPage].map((product) => (
            <div className="w-full" key={product.id}>
              <div className="grid grid-cols-[2fr_2fr_5fr_2fr_3fr_2fr] py-3">
                <div className="font-semibold">{product.name}</div>
                <div>{product.price}</div>
                <div>{product.quantity}</div>
                <div>{product.description}</div>
                <div>
                  <img src={product.image} alt="" className="w-10 h-10" />
                </div>
                <div>
                  <button
                    className="px-2 py-1 text-xl text-[#8B909A] rounded-md shadow-none"
                    onClick={() => {
                      props.setIsProductModalOpen(true);
                      setSelectedProduct(product);
                    }}
                  >
                    <SlNote />
                  </button>
                  <button
                    className="px-2 py-1 text-xl text-[#8B909A] rounded-md shadow-none"
                    onClick={() => {
                      onDeleteProduct(product);
                    }}
                  >
                    <BiTrash />
                  </button>
                </div>
              </div>
              <hr />
            </div>
          ))}

        <div>
          <div className="flex justify-between">
            <div>
              Showing{' '}
              <select
                className="px-2 py-1 rounded-md shadow-none"
                onChange={(e) => {
                  setNumberOfProductPerPage(parseInt(e.target.value));
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>{' '}
              of {products.length}
            </div>

            <div className="flex justify-center gap-[3px]">
              <button
                className="px-2 py-1 bg-[#F1F2F6] text-[#8B909A] shadow-none"
                onClick={() => {
                  if (currentPage > 0) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
              >
                <GrPrevious />
              </button>
              {Array.from(Array(pages).keys()).length > 5 ? (
                <button className="px-2 py-1 bg-blue-600 text-white shadow-none" key={currentPage}>
                  {' '}
                  {currentPage + 1}
                </button>
              ) : (
                Array.from(Array(pages).keys()).map((page) => (
                  <button
                    className={`px-2 py-1 shadow-none ${currentPage === page ? 'font-bold bg-blue-600 text-white' : 'bg-[#F1F2F6] text-[#8B909A] '}`}
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                    }}
                  >
                    {page + 1}
                  </button>
                ))
              )}
              <button
                className="px-2 py-1 bg-[#F1F2F6] text-[#8B909A] shadow-none"
                onClick={() => {
                  if (currentPage < pages - 1) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
              >
                <MdNavigateNext />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
