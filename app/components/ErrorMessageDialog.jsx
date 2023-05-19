import styles from './ErrorMessageDialog.module.css';

export default function ErrorMessageDialog({ errorMessageText, close }) {
  return (
    <div className={styles.errorDialog}>
      {errorMessageText}

      <button className={styles.confirmButton} onClick={close}>
        Зрозуміло, дякую
      </button>
    </div>
  );
}
