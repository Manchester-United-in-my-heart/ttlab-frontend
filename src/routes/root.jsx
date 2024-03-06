import { useContext, useEffect, useState } from 'react';
import { SideBar } from '../fragments/side-bar';
import { searchProduct, searchUser } from '../helper/utils.ts';
import ListView from '../fragments/list-view.tsx';
import { DummyActiveUser, numberOfNotifications } from '../data/data.ts';
import LoadingModal from '../modals/LoadingModal.tsx';
import { LoadingContext } from '../storage/LoadingContext.tsx';
import { Helmet } from 'react-helmet';
import { getUsers, createUser, modifyUser, deleteUser, getProducts, createProduct, modifyProduct, deleteProduct, getProfile } from '../api/api.ts';

export default function Root() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  // send token named 'token' to server for authentication. If return 401, redirect to login page.

  const token = localStorage.getItem('accessToken');
  if (!token) {
    window.location.href = '/login';
  }
  const View = {
    USER: 'USER',
    PRODUCT: 'PRODUCT',
  };
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [filteredProductList, setFilteredProductList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [view, setView] = useState(View.USER);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [dummyUserList, setDummyUserList] = useState([]);
  const [dummyProductList, setDummyProductList] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  // Fetch Data from server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userProfile = await (await getProfile()).json();
        setUserProfile({
          userName: userProfile.username,
          userEmail: userProfile.email,
          userAvatar: userProfile.image,
        });

        const res = await getUsers();
        if (res.status === 401) {
          window.location.href = '/login';
        }

        const data = await res.json();
        const userList = data.map((user) => ({
          id: user._id,
          avatar: user.avatarUrl,
          name: user.name,
          email: user.email,
          DOB: user.dateOfBirth,
          phone: user.phone,
        }));

        setDummyUserList(userList);
        setFilteredUserList(userList);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        if (res.status === 401) {
          window.location.href = '/login';
        }

        const data = await res.json();
        const productList = data.map((product) => ({
          id: product._id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          description: product.description,
          image: product.imageUrl,
        }));

        setDummyProductList(productList);
        setFilteredProductList(productList);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
    fetchProducts();
  }, []);

  const onCreateUser = async (user) => {
    setIsLoading(true);
    // send data to server
    const res = await createUser(user);
    try {
      if (res.status === 401) {
        window.location.href = '/login';
      }
      const data = await res.json();
      if (data.errors?.length > 0) {
        setIsLoading(false);
        alert(data.errors.join('\n'));
      } else {
        setIsLoading(false);
        window.location.reload();
      }
    } catch (err) {
      alert('Error');
      setIsLoading(false);
      console.log(err);
    }
  };

  const onCreateProduct = async (product) => {
    setIsLoading(true);

    // send data to server
    const res = await createProduct(product);
    try {
      if (res.status === 401) {
        window.location.href = '/login';
      }

      const data = await res.json();
      if (data.errors?.length > 0) {
        setIsLoading(false);
        alert(data.errors.join('\n'));
      } else {
        setIsLoading(false);
        window.location.reload();
      }
    } catch (err) {
      alert('Error');
      setIsLoading(false);

      console.log(err);
    }
  };

  const onModifyProduct = async (product) => {
    setIsLoading(true);
    const res = await modifyProduct(product);
    try {
      if (res.status === 401) {
        window.location.href = '/login';
      }

      const data = await res.json();
      if (data.errors?.length > 0) {
        setIsLoading(false);
        alert(data.errors.join('\n'));
      } else {
        setIsLoading(false);
        window.location.reload();
      }
    } catch (err) {
      alert('Error');
      setIsLoading(false);

      console.log(err);
    }
  };

  const onDeleteProduct = async (product) => {
    // // send data to server
    setIsLoading(true);
    const res = await deleteProduct(product);
    try {
      if (res.status === 401) {
        window.location.href = '/login';
      }

      const data = await res.json();
      if (data.errors?.length > 0) {
        setIsLoading(false);
        alert(data.errors.join('\n'));
      } else {
        setIsLoading(false);
        window.location.reload();
      }
    } catch (err) {
      alert('Error');
      setIsLoading(false);

      console.log(err);
    }
  };

  const onModifyUser = async (user) => {
    setIsLoading(true);
    // send data to server
    const res = await modifyUser(user);

    try {
      if (res.status === 401) {
        window.location.href = '/login';
      }

      const data = await res.json();
      if (data.errors?.length > 0) {
        setIsLoading(false);
        alert(data.errors.join('\n'));
      } else {
        setIsLoading(false);
        window.location.reload();
      }
    } catch (err) {
      alert('Error');
      setIsLoading(false);
      console.log(err);
    }
  };

  const onDeleteUser = async (user) => {
    // // send data to server
    setIsLoading(true);

    const res = await deleteUser(user);

    try {
      if (res.status === 401) {
        window.location.href = '/login';
      }

      const data = await res.json();
      if (data.errors?.length > 0) {
        setIsLoading(false);
        alert(data.errors.join('\n'));
      } else {
        setIsLoading(false);
        window.location.reload();
      }
    } catch (err) {
      alert('Error');
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <div className="relative top-0 left-0 w-full h-full min-h-screen box-border">
        <Helmet>
          <title>Dashboard</title>
          <link rel="icon" href="/ttl.svg" />
        </Helmet>

        <LoadingModal isLoading={isLoading} />
        <div className={`relative w-full h-full bg-[#F1F2F6] ${isSideBarOpen ? 'grid grid-flow-col grid-cols-[1fr_7fr] gap-[10px]' : 'flex gap-[10px]'} overflow-x-hidden`}>
          <SideBar view={view} setView={setView} isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen} />
          <ListView
            {...userProfile}
            isSideBarOpen={isSideBarOpen}
            setIsSideBarOpen={setIsSideBarOpen}
            dummyActiveUser={DummyActiveUser}
            numberOfNotifications={numberOfNotifications}
            dummyUsers={dummyUserList}
            dummyProducts={dummyProductList}
            setView={setView}
            view={view}
            filteredUsers={filteredUserList}
            setFilteredUsers={setFilteredUserList}
            filteredProducts={filteredProductList}
            setFilteredProducts={setFilteredProductList}
            isUserModalOpen={isUserModalOpen}
            setIsUserModalOpen={setIsUserModalOpen}
            isProductModalOpen={isProductModalOpen}
            setIsProductModalOpen={setIsProductModalOpen}
            searchUser={searchUser}
            searchProduct={searchProduct}
            onCreateUser={onCreateUser}
            onCreateProduct={onCreateProduct}
            onModifyProduct={onModifyProduct}
            onDeleteProduct={onDeleteProduct}
            onDeleteUser={onDeleteUser}
            onModifyUser={onModifyUser}
          />
        </div>
      </div>
    </>
  );
}
