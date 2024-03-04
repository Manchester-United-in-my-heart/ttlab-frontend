import { useContext, useEffect, useState } from 'react';
import { SideBar } from '../fragments/side-bar';
import { searchProduct, searchUser } from '../helper/utils.ts';
import ListView from '../fragments/list-view.tsx';
import { DummyActiveUser, numberOfNotifications } from '../data/data.ts';
import LoadingModal from '../modals/LoadingModal.tsx';
import { LoadingContext } from '../storage/LoadingContext.tsx';
import { Helmet } from 'react-helmet';

export default function Root() {
  const host = import.meta.env.VITE_HOST || 'https://nest-mongo-gold.vercel.app';
  // console.log(host);
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

  // Fetch Data from server
  useEffect(() => {
    fetch(`${host}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          window.location.href = '/login';
        }
        return res.json();
      })
      .then((data) => {
        const userList = [];
        data.forEach((user) => {
          userList.push({
            id: user._id,
            avatar: user.avatarUrl,
            name: user.name,
            email: user.email,
            DOB: user.dateOfBirth,
            phone: user.phone,
          });
          setDummyUserList(userList);
          setFilteredUserList(userList);
        });
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`${host}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          window.location.href = '/login';
        }
        return res.json();
      })
      .then((data) => {
        const productList = [];
        data.forEach((product) => {
          productList.push({
            id: product._id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            description: product.description,
            image: product.imageUrl,
          });
          setDummyProductList(productList);
          setFilteredProductList(productList);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onCreateUser = async (user) => {
    setIsLoading(true);
    // send data to server
    const res = await fetch(`${host}/users`, {
      body: JSON.stringify({
        name: user.name || '',
        email: user.email || '',
        dateOfBirth: user.DOB || '',
        phone: user.phone || '',
        avatarUrl: user.avatar  || '',
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
    });
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
    const res = await fetch(`${host}/products`, {
      body: JSON.stringify({
        name: product.name || '',
        price: product.price || '',
        quantity: product.quantity || '',
        description: product.description || '',
        imageUrl: product.image || '',
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
    });
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
    const res = await fetch(`${host}/products/${product.id}`, {
      body: JSON.stringify({
        name: product.name || '',
        price: product.price || '',
        quantity: product.quantity || '',
        description: product.description || '',
        imageUrl: product.image || '',
      }),
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
    });
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
    const res = await fetch(`${host}/products/${product.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
    });
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
    const res = await fetch(`${host}/users/${user.id}`, {
      body: JSON.stringify({
        name: user.name || '',
        email: user.email || '',
        dateOfBirth: user.DOB || '',
        phone: user.phone || '',
        avatarUrl: user.avatar || '',
      }),
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
    });

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
    const res = await fetch(`${host}/users/${user.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
    });

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
