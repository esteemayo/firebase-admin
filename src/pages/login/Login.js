import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../firebase';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

import './login.scss';

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useGlobalAuthContext();

  const emailRef = useRef();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        loginUser(user);
        navigate('/');
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          ref={emailRef}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
        {error && <span>Wrong email or password!</span>}
      </form>
    </div>
  );
};

export default Login;
