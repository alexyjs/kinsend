import { useState, useCallback } from "react";

export const useModal = (config = {}) => {
  const { defaultVisible = false } = config;

  const [visible, setVisible] = useState(defaultVisible);
  const show = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);

  const modalProps = {
    visible,
    onCancel: close,
  };
  return {
    visible,
    show,
    close,
    modalProps,
  };
};
