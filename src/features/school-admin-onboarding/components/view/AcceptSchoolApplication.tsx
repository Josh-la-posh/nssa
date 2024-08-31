import { useState } from 'react';

import { Button } from '@/components/Elements';
import { Input } from '@/components/Form';
import { useNotification } from '@/hooks';

type AcceptSchoolApplicationModalContentProps = {
  onCancel?: () => void;
  onAccept: (payload: { comment: string }) => void;
};

export const AcceptSchoolApplicationModalContent = ({
  onCancel,
  onAccept,
}: AcceptSchoolApplicationModalContentProps) => {
  const notification = useNotification();
  const [comment, setComment] = useState('');

  const handleOnCancel = () => {
    onCancel && onCancel();
  };

  const handleUpdateComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleOnAccept = () => {
    if (comment) {
      onCancel && onCancel();
      setTimeout(() => {
        onAccept({ comment });
      }, 1000);
    } else {
      notification.show({
        type: 'error',
        title: 'Validation Error',
        message: 'Comment is required',
      });
    }
  };

  return (
    <div className="py-12 px-14 md:w-[670px]">
      <h3 className="text-center text-[18px] font-bold mb-8">Accept School</h3>
      <Input
        label="Add comment"
        placeholder="Enter comment"
        value={comment}
        onChange={handleUpdateComment}
        className="w-full mb-2"
      />

      <div className="flex justify-center gap-8 mt-4">
        <Button className="min-w-[127px] h-[27px] rounded mr-[35px]" onClick={handleOnAccept}>
          Accept
        </Button>
        <Button
          variant="outlined"
          className="min-w-[127px] h-[27px] rounded"
          onClick={handleOnCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
