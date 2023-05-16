import { LoginForm } from './form';
import styles from './login.module.css';

export default function LoginPage() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.formDiv}>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
