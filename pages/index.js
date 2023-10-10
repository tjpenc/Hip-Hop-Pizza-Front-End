import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import RegisterForm from '../components/RegisterForm';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    checkUser(user.uid).then((data) => setAuthUser(data[0]));
    console.warn('thisUser', authUser);
  }, []);

  const onUpdate = () => {
    checkUser(user.uid).then((data) => setAuthUser(data));
  };

  console.warn(user.uid);
  console.warn(authUser?.uid);

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
          <Button variant="secondary" type="button" size="lg" className="copy-btn" onClick={() => console.warn('clicked view orders')}>
            View Orders
          </Button>
          <br />
          <Button variant="secondary" type="button" size="lg" className="copy-btn" onClick={() => console.warn('clicked create orders')}>
            Create Orders
          </Button>
          <br />
          <Button variant="secondary" type="button" size="lg" className="copy-btn" onClick={() => console.warn('clicked view revenue')}>
            View Revenue
          </Button>
        </div>
      ) : (<RegisterForm user={user} onUpdate={onUpdate} />)}
    </>
  );
}

export default Home;
