import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { DriveFolderUploadOutlined } from '@mui/icons-material';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import app from '../../firebase';
import { auth, db } from '../../firebase';
import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';

import './new.scss';

const New = ({ inputs, title }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const userPath = pathname.includes('/users/new');

  const [file, setFile] = useState('');
  const [per, setPer] = useState(null);
  const [data, setData] = useState(null);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    const uploadFile = () => {
      const fileName = `${new Date().getTime()}-${file.name}`;

      const storage = getStorage(app);
      const storageRef = ref(
        storage,
        `${userPath ? 'users' : 'products'}/${fileName}`
      );

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setPer(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => {
              return { ...prev, img: downloadURL };
            });
          });
        }
      );
    };

    file && uploadFile();
  }, [file, userPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (userPath) {
        const res = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        await setDoc(doc(db, 'users', res.user.uid), {
          ...data,
          timeStamp: serverTimestamp(),
        });

        navigate('/users');
      } else {
        await addDoc(collection(db, 'products'), {
          ...data,
          timeStamp: serverTimestamp(),
        });

        navigate('/products');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='new'>
      <Sidebar />
      <div className='new-container'>
        <Navbar />
        <div className='top'>
          <h1>{title}</h1>
        </div>
        <div className='bottom'>
          <div className='left'>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt=''
            />
          </div>
          <div className='right'>
            <form onSubmit={handleSubmit}>
              <div className='form-input'>
                <label htmlFor='file'>
                  Image: <DriveFolderUploadOutlined className='icon' />
                </label>
                <input
                  type='file'
                  id='file'
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>
              {inputs.map((item) => {
                const { id, name, type, label, placeholder } = item;
                return (
                  <div className='form-input' key={id}>
                    <label htmlFor={id}>{label}</label>
                    <input
                      id={id}
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      onChange={handleChange}
                    />
                  </div>
                );
              })}

              <button type='submit' disabled={per !== null && per < 100}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
