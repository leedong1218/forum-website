import { createContext, useContext, useState } from 'react';
import { ModalTypes } from '@/lib/types/modalType';
import MessageModal from '@/components/common/MessageModal';

interface ModalContextInterface {
  setIsShow: (status: boolean) => void;
  setModalProps: (modalProps: ModalProps) => void;
}

export interface ModalProps {
  type?: ModalTypes;
  message?: string;
  handleClick?: () => void;
}

const MessageModalContext = createContext<ModalContextInterface | null>(null);

export const MessageModalProvider = ({ children } :
  { children: React.ReactNode }) => {
  const [isShow, setIsShow] = useState(false);
  const [modalProps, setModalProps] = useState<ModalProps>({});

  const value = {
    setIsShow,
    setModalProps
  };

  return (
    <MessageModalContext.Provider value={value}>
      <MessageModal modal={modalProps} isShow={isShow}/>
      {children}
    </MessageModalContext.Provider>
  );
};

export function useMessageModal() {
  const context = useContext(MessageModalContext);

  if (!context) {
    throw new Error('useLoading must be used within MessageModalProvider');
  }
  return context;
}