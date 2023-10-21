import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import RegisterForm from '../components/RegisterForm';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const [authUser, setAuthUser] = useState();

  const setNewUser = (newUser) => checkUser(newUser.uid).then((data) => setAuthUser(data[0]));

  useEffect(() => {
    setNewUser(user);
    console.warn('thisUser', authUser);
  }, [user]);

  const onUpdate = (newUser) => {
    setNewUser(newUser);
  };

  return (
    <>
      {authUser?.uid === user?.uid ? (
        <div
          className="text-center d-flex flex-column justify-content-center align-content-center"
          style={{
            height: '90vh',
            padding: '30px',
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          <h1>Hello {user?.fbUser?.displayName}! </h1>
          <br />
          <br />
          <Link passHref href="/orders/orders">
            <Button variant="secondary" type="button" size="lg" className="copy-btn">
              View Orders
            </Button>
          </Link>
          <br />
          <Link passHref href="/orders/createOrder">
            <Button variant="secondary" type="button" size="lg" className="copy-btn">
              Create an Order
            </Button>
          </Link>
          <br />
          <Link passHref href="/revenue">
            <Button variant="secondary" type="button" size="lg" className="copy-btn">
              Revenue
            </Button>
          </Link>
        </div>
      ) : (<RegisterForm user={user} onUpdate={onUpdate} />)}
    </>
  );
}

export default Home;
