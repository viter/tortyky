import Image from 'next/image';
import styles from './TortCardAdmin.module.css';

export default function TortCardAdmin({ tort }) {
  const imgSrc = '/images/' + tort.images.split(',')[0];
  const tags = tort.tags.map((t) => t.tag.name).join(', ');

  return (
    <div className={styles.cardMain}>
      <Image src={imgSrc} width={160} height={100} alt="tortyk" />
      <div>{tort.name}</div>
      <div>{tort.description}</div>
      <div>{tags}</div>
    </div>
  );
}
