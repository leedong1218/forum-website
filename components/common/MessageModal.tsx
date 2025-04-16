import { ModalProps, useMessageModal } from "@/lib/context/MessageModalContext";
import styles from "@/styles/components/MessageModal.module.scss";
import { ModalTypes } from "@/lib/types/modalType";

export default function MessageModal({
  isShow,
  modal,
}: {
  isShow: boolean;
  modal: ModalProps;
}) {
  const { setIsShow } = useMessageModal();
  const { type, message, handleClick } = modal;

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget === e.target) {
      handleClick
        ? handleClick()
        : type === ModalTypes.SUCCESS
          ? handleDefaultSuccessClick()
          : handleDefaultErrorClick();
    }
  };

  const handleDefaultErrorClick = () => {
    setIsShow(false);
  };

  const handleDefaultSuccessClick = () => {
    setIsShow(false);
  };

  return (
    <div
      className={`${styles.modalWrap} ${styles.message} ${isShow ? styles.display : ""}`}
      onClick={handleClose}
    >
      <div className={styles.modalContent}>
        <div
          className={`${styles.modalHeader} ${type === ModalTypes.ERROR ? styles.error : 
            type === ModalTypes.WARNING ? styles.warning : 
            styles.success}`}
        >
          <p className={styles.modalTitle}>訊息</p>
        </div>
        <div className={styles.modalBody}>
          <p>{message}</p>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.closeButton} onClick={handleClose}>
            關閉
          </button>
        </div>
      </div>
    </div>
  );
}
