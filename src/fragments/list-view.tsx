import { User } from '../components/UserList';
import { Product } from '../components/ProductList';
import ProductPage from '../routes/product-page.tsx';
import UserPage from '../routes/user-page.tsx';
import NotificationBell from '../components/notification-bell';
import Badge from '../components/badge';
import SearchBox from '../components/search.tsx';
import { GoPlus } from 'react-icons/go';
import UserModal from '../modals/UserModal.tsx';
import ProductModal from '../modals/ProductModal.tsx';
type ListViewProps = {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (isSideBarOpen: boolean) => void;
  userName: string;
  userEmail: string;
  userAvatar: string;
  // userState: 'online' | 'offline';
  numberOfNotifications: number;
  dummyUsers: User[];
  dummyProducts: Product[];

  view: 'USER' | 'PRODUCT';
  setView: (view: 'USER' | 'PRODUCT') => void;

  filteredUsers: User[];
  setFilteredUsers: (filteredUsers: User[]) => void;
  filteredProducts: Product[];
  setFilteredProducts: (filteredProducts: Product[]) => void;

  isUserModalOpen: boolean;
  setIsUserModalOpen: (isUserModalOpen: boolean) => void;
  isProductModalOpen: boolean;
  setIsProductModalOpen: (isProductModalOpen: boolean) => void;

  searchUser: (users: User[], value: string) => User[];
  searchProduct: (products: Product[], value: string) => Product[];

  onCreateUser: (user: User) => void;
  onCreateProduct: (product: Product) => void;

  onModifyProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;

  onModifyUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
};

export default function ListView(props: ListViewProps) {
  const View = {
    USER: 'USER',
    PRODUCT: 'PRODUCT',
  };
  const { isSideBarOpen, userName, userEmail, userAvatar, numberOfNotifications, dummyUsers, dummyProducts, view, filteredUsers, setFilteredUsers, filteredProducts, setFilteredProducts, isUserModalOpen, setIsUserModalOpen, isProductModalOpen, setIsProductModalOpen, searchUser, searchProduct, onModifyProduct, onDeleteProduct, onCreateProduct, onCreateUser, onDeleteUser, onModifyUser } = props;
  const userState = 'online';
  return (
    <div className={`${!isSideBarOpen && 'w-full'} ml-[10px] mr-[10px] pt-[10px]`}>
      {/* User Modal */}
      {isUserModalOpen && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-[#342b2b53] z-10 flex items-center justify-center">
          <div className="mx-auto my-auto">
            <UserModal isOpen={isUserModalOpen} onClose={() => setIsUserModalOpen(false)} onCreate={onCreateUser} onModify={onModifyUser} />
          </div>
        </div>
      )}
      {/* Product Modal */}
      {isProductModalOpen && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-[#342b2b53] z-10 flex items-center justify-center">
          <div className="mx-auto my-auto">
            <ProductModal
              isOpen={isProductModalOpen}
              onClose={() => {
                setIsProductModalOpen(false);
              }}
              onCreate={onCreateProduct}
              onModify={onModifyProduct}
            />
          </div>
        </div>
      )}
      <div className="flex justify-between">
        <div className={`font-semibold`}>{view === View.PRODUCT ? `Danh sách sản phẩm` : view === View.USER && `Danh sách người dùng`} </div>
        <div className="flex gap-[15px]">
          <NotificationBell numberOfNotifications={numberOfNotifications} />
          <Badge userName={userName} userEmail={userEmail} userAvatar={userAvatar} userState={userState} />
        </div>
      </div>
      <div className="flex justify-between mt-[20px] mb-[10px]">
        <SearchBox
          onSearch={(value) => {
            if (view === View.PRODUCT) {
              setFilteredProducts(searchProduct(dummyProducts, value));
            } else {
              setFilteredUsers(searchUser(dummyUsers, value));
            }
          }}
        />
        {view === View.PRODUCT ? (
          <button
            className="bg-blue-500 text-white rounded-md px-4 py-2 ml-2 flex flex-row gap-4 justify-center items-center"
            onClick={() => {
              setIsProductModalOpen(true);
            }}
          >
            <div className="inline">
              <GoPlus size={20} />
            </div>
            <div className="hidden md:flex">Tạo mới</div>
          </button>
        ) : (
          view === View.USER && (
            <button
              className="bg-blue-500 text-white rounded-md px-4 py-2 ml-2 flex flex-row gap-4 justify-center items-center"
              onClick={() => {
                setIsUserModalOpen(true);
              }}
            >
              <div className="inline">
                <GoPlus size={20} />
              </div>
              <div className="hidden md:flex">Tạo mới</div>
            </button>
          )
        )}
      </div>
      <div className="bg-white p-5 rounded-xl">{view === View.PRODUCT ? <ProductPage productList={filteredProducts} onModifyProduct={onModifyProduct} onDeleteProduct={onDeleteProduct} onCreatedProduct={onCreateProduct} isProductModalOpen={isProductModalOpen} setIsProductModalOpen={setIsProductModalOpen} /> : view === View.USER && <UserPage users={filteredUsers} isUserModalOpen={isUserModalOpen} onCreateUser={onCreateUser} onDeleteUser={onDeleteUser} onModifyUser={onModifyUser} setIsUserModalOpen={setIsUserModalOpen} />}</div>
    </div>
  );
}
