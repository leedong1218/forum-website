import { useLoading } from '@/context/LoadingContext';
import { useMessageModal } from '../context/MessageModalContext';
import { ModalTypes } from '../enumrate/ModalTypes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Response } from './Request.type';

interface UseAPIControlUnit<T> {
  apiFuntion: (props?: unknown) => Promise<Response<T>>
  props: unknown
  routerPath?: string
  isReload?: boolean
  isShow: boolean
}

export function useAPILoadingControl<T>({ apiFuntion, props, routerPath, isReload, isShow } : UseAPIControlUnit<T>) {
  const { setLoading } = useLoading();
  const { setIsShow, setModalProps } = useMessageModal();
  const [data, setData] = useState<T>();
  const router = useRouter();

  useEffect(() => {
    const triggerAPI = async () => {
      if (!props) {
        return;
      }

      setLoading(true);
      try {
        const response = await apiFuntion();

        setData(response.data);
        if (response.message) {
          setModalProps({
            'type': ModalTypes.SUCCESS,
            'message': String(response.message),
            'isReload': isReload,
          });
          setIsShow(isShow);
          if (routerPath) {
            router.push(routerPath);
          }
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setModalProps({
            type: ModalTypes.ERROR,
            message: error.message,
          });
        } else {
          setModalProps({
            type: ModalTypes.ERROR,
            message: "發生未知錯誤",
          });
        }
        setIsShow(isShow);
      }
    };

    triggerAPI();
  }, [apiFuntion]);

  if (data) {
    return { data };
  };
}
