export const isLoggedIn = (): boolean => {
    const token = localStorage.getItem('access_token');
    alert(token);
    return !!token;
  };
  
  export const requireLogin = (
    onSuccess: () => void,
    onFail?: () => void
  ): void => {
    if (isLoggedIn()) {
      onSuccess();
    } else {
      if (onFail) onFail();
      alert("請先登入才能執行此操作！");
    }
  };
  