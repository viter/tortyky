'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './login.module.css';
import Image from 'next/image';

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ email: '', password: '' });

      const res = await signIn('credentials', {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });

      setLoading(false);

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        console.log('ERROR: ', res.error);
        setError('Невірна ел. пошта або пароль');
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <form onSubmit={onSubmit}>
      {error && <p className={styles.error}>{error}</p>}
      <div>
        <input
          required
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Електронна пошта"
          className={styles.loginInput}
        />
      </div>
      <div>
        <input
          required
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Пароль"
          className={styles.loginInput}
        />
      </div>

      <div className={styles.buttons}>
        <button type="submit" className={styles.loginButton} disabled={loading}>
          {loading ? 'loading...' : 'Увійти'}
        </button>

        <p className="">Або</p>

        <a
          className={styles.googleButton}
          onClick={() => signIn('google', { callbackUrl })}
          role="button"
        >
          <Image
            className={styles.googleLogo}
            src="/google.svg"
            width={50}
            height={50}
            alt="sign in with google"
          />
          Продовжіть з Google
        </a>
      </div>
    </form>
  );
};
