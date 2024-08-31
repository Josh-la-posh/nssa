import { useCallback, useMemo, useState } from 'react';

import { Modal, ModalPropsType } from '@/components/Elements';

type ModalOptionType = Omit<ModalPropsType, 'isOpen' | 'closeModal' | 'children' | 'title'>;
type ShowModalType = {
  title?: string;
  options?: ModalOptionType;
  showModal: (onClose?: () => void) => JSX.Element;
};

/**
 * Returns a modal component, and a function to render the component.
 *
 */
export const useModal = (): [
  JSX.Element | null,
  ({ title, showModal, options }: ShowModalType) => void
] => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<null | {
    content: JSX.Element;
    title?: string;
    options?: ModalOptionType;
  }>(null);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const modalComponent = useMemo(() => {
    if (modalContent === null) {
      return null;
    }
    const { title, content, options } = modalContent;

    return (
      <Modal {...options} title={title} isOpen={isOpen} closeModal={onClose}>
        {content}
      </Modal>
    );
  }, [isOpen, modalContent, onClose]);

  const showModal = useCallback(
    ({ title, options, showModal }: ShowModalType) => {
      setModalContent({ content: showModal(onClose), title, options });
      setIsOpen(true);
    },

    [onClose]
  );

  return [modalComponent, showModal];
};
