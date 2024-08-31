import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Elements';
import { ConfirmDialog, Success, Error } from '@/components/Elements/Modal/confirmation';
import { useModal } from '@/hooks';

import { useAcceptSchoolAdminApplication, useRejectSchoolAdminApplication } from '../../api';

import { AcceptSchoolApplicationModalContent } from './AcceptSchoolApplication';
import { RejectSchoolApplicationModalContent } from './RejectSchoolApplication';

type SchoolApplicationActionsProp = {
  applicationId: string;
};
export const SchoolApplicationActions = ({ applicationId }: SchoolApplicationActionsProp) => {
  const navigate = useNavigate();
  //   const [modalContentForAcceptanceForm, setModalContentForAcceptanceForm] = useModal();
  //   const [modalContentForRejectionForm, setModalContentForRejectionForm] = useModal();
  //   const [modalContentForRejectionConfirmationModal, setModalContentForRejectionConfirmationModal] =
  //     useModal();
  const [modalContent, setModalContent] = useModal();

  const { mutateAsync: rejectApplicationMutateAsync } = useRejectSchoolAdminApplication();
  const { mutateAsync: acceptApplicationMutateAsync } = useAcceptSchoolAdminApplication();

  const handleOnSuccess = () => {
    navigate('/onboarding/school-admin');
  };

  const handleAcceptanceModal = () => {
    setModalContent({
      options: { position: 'center', size: 'xl' },
      showModal: (onclose) => (
        <AcceptSchoolApplicationModalContent
          onCancel={onclose}
          onAccept={handleAcceptApplication}
        />
      ),
    });
  };

  const handleRejectionModal = () => {
    setModalContent({
      options: { position: 'center', size: 'xl' },
      showModal: (onclose) => (
        <RejectSchoolApplicationModalContent
          onCancel={onclose}
          onReject={handleRejectApplication}
        />
      ),
    });
  };

  const handleRejectApplication = (payload: { comment: string; blockUser: boolean }) => {
    setModalContent({
      options: {
        position: 'top',
      },
      showModal: (onClose) => (
        <ConfirmDialog
          title="Rejection confirmation"
          description="This school application information would be saved"
          onSuccess={async () => {
            await rejectApplicationMutateAsync(
              { ...payload, applicationId },
              {
                onSuccess: () => {
                  setModalContent({
                    title: 'Success',
                    showModal: () => (
                      <Success
                        title="School admin application successfully"
                        description="The school application details have been saved successfully"
                        onSuccess={handleOnSuccess}
                      />
                    ),
                  });
                },
                onError: (res) => {
                  setModalContent({
                    title: 'Rejection Error',
                    showModal: () => (
                      <Error
                        title="Error rejecting school application"
                        description={res.message}
                        onSuccess={onClose}
                      />
                    ),
                  });
                },
              }
            );
          }}
          onCancel={onClose}
        />
      ),
    });
  };

  const handleAcceptApplication = (payload: { comment: string }) => {
    setModalContent({
      options: {
        position: 'top',
      },
      showModal: (onClose) => (
        <ConfirmDialog
          title="Acceptance confirmation"
          description="This school application information would be saved"
          onSuccess={async () => {
            await acceptApplicationMutateAsync(
              { ...payload, applicationId },
              {
                onSuccess: () => {
                  setModalContent({
                    title: 'Success',
                    showModal: () => (
                      <Success
                        title="School admin application successfully"
                        description="The school application details have been saved successfully"
                        onSuccess={handleOnSuccess}
                      />
                    ),
                  });
                },
                onError: (res) => {
                  setModalContent({
                    title: 'Acceptance Error',
                    showModal: () => (
                      <Error
                        title="Error accepting school application"
                        description={res.message}
                        onSuccess={onClose}
                      />
                    ),
                  });
                },
              }
            );
          }}
          onCancel={onClose}
        />
      ),
    });
  };

  return (
    <>
      <div className="">
        <Button
          className="min-w-[127px] h-[27px] rounded mr-[35px]"
          onClick={handleAcceptanceModal}
        >
          Accept
        </Button>
        <Button className="bg-error min-w-[127px] h-[27px] rounded" onClick={handleRejectionModal}>
          Reject
        </Button>
      </div>
      {/* {modalContentForAcceptanceForm}
      {modalContentForRejectionForm}
      {modalContentForRejectionConfirmationModal} */}
      {modalContent}
    </>
  );
};
