import { RefObject, useEffect } from 'react';

// TODO -> Note: resize event is currently not handled.

const useAutosizeTextArea = (textAreaRef: RefObject<HTMLTextAreaElement>, value: string) => {
  useEffect(() => {
    const textAreaElement = textAreaRef?.current;
    if (textAreaElement) {
      textAreaElement.style.height = '0px';
      const { scrollHeight } = textAreaElement;

      textAreaElement.style.height = `${scrollHeight}px`;
    }
  }, [textAreaRef, value]);
};

export default useAutosizeTextArea;
