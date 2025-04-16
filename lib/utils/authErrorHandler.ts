let handleAuthError: (msg: string) => void = (msg) => {
  alert(msg);
  window.location.href = '/login';
};

let handleAuthWarning: (msg: string) => void = (msg) => {
  alert(msg);
};

export const setAuthErrorHandler = (
  handler: (msg: string) => void,
  warningHandler?: (msg: string) => void
) => {
  handleAuthError = handler;
  if (warningHandler) {
    handleAuthWarning = warningHandler;
  }
};

export const triggerAuthError = (msg: string) => {
  handleAuthError(msg);
};

export const triggerAuthWarning = (msg: string) => {
  handleAuthWarning(msg);
};
