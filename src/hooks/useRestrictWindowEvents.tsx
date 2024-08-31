import { useEffect } from 'react';
type EventType = 'paste' | 'copy' | 'cut';
interface RestrictCopyPasteProps {
  actions: [EventType?, EventType?, EventType?];
}
export const useRestrictWindowEvents = (props: RestrictCopyPasteProps) => {
  useEffect(() => {
    props.actions?.forEach((action) => {
      action && window.addEventListener(action, preventPaste);
    });
    return () => {
      props.actions.forEach((action) => {
        action && window.removeEventListener(action, preventPaste);
      });
    };
  }, [props.actions]);

  const preventPaste = (e: Event) => {
    alert('Copying and pasting is not allowed!');
    e.preventDefault();
  };
};
