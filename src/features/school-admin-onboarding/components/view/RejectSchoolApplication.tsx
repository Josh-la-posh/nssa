import { useState } from 'react';

import { Button } from '@/components/Elements';
import { Input, Switch } from '@/components/Form';
import { useNotification } from '@/hooks';

type RejectSchoolApplicationModalContentProps = {
  onCancel?: () => void;
  onReject: (payload: { comment: string; blockUser: boolean }) => void;
};

export const RejectSchoolApplicationModalContent = ({
  onCancel,
  onReject,
}: RejectSchoolApplicationModalContentProps) => {
  const notification = useNotification();
  const [comment, setComment] = useState('');
  const [blockUser, setBlockUser] = useState(false);

  const handleOnCancel = () => {
    onCancel && onCancel();
  };

  const handleUpdateComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleUpdateBlockUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlockUser(e.target.value.toLowerCase() === 'true' ? true : false);
  };

  const handleOnReject = () => {
    if (comment) {
      onCancel && onCancel();
      setTimeout(() => {
        onReject({ comment, blockUser });
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
      <h3 className="text-center text-[18px] font-bold mb-8">Reject School</h3>
      <Input
        label="Add comment"
        placeholder="Enter comment"
        value={comment}
        onChange={handleUpdateComment}
        className="w-full mb-2"
      />
      <div className="flex justify-end">
        <Switch label="Block" onChange={handleUpdateBlockUser} />
      </div>

      <div className="flex justify-center gap-8 mt-4">
        <Button className="bg-error min-w-[127px] h-[27px] rounded" onClick={handleOnReject}>
          Reject
        </Button>
        <Button className="min-w-[127px] h-[27px] rounded mr-[35px]" onClick={handleOnCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
