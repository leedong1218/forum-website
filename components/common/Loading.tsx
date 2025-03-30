import styles from '@/styles/components/Loading.module.scss';

export default function Loading() {
  return (
    <div>
      <div className={styles.overlay}></div>
      <div className={styles.loadingContainer}>
        <div className={styles.loadingBox}>
          <div className={styles.decorCircle1}></div>
          <div className={styles.decorCircle2}></div>
          
          <div className={styles.loadingIcon}>
            <div className={styles.pulseCircle}></div>
            <div className={styles.spinner}></div>
          </div>
          
          <div className={styles.loadingText}>處理中</div>
          <div className={styles.loadingSubtext}>系統處理中，請稍候...</div>
        </div>
      </div>
    </div>
  );
}