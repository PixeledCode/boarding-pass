import styles from './Skeleton.module.scss';

export const Skeleton = () => {
  return (
    <div className={styles.Skeleton}>
      <span className="sr-only">Loading</span>
    </div>
  );
};
