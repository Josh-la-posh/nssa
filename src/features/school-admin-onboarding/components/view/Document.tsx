import { Button } from '@/components/Elements';
import { DocumentType } from '@/components/Elements/DocumentIcon';
import { Attachment } from '@/features/auth';
import { convertBytesToMB } from '@/utils/convertSize';

import { ReactComponent as DownloadSvg } from '../../assets/icons/download.svg';

type ApplicationDocumentProp = {
  attachment: Attachment;
};
export const ApplicationDocument = ({ attachment }: ApplicationDocumentProp) => {
  return (
    <div className="py-4 px-3 flex gap-6 items-center col-span-1">
      <DocumentType type={attachment.type} />
      <div className="w-full">
        <h3>
          {attachment.name.length > 20 ? `${attachment.name.slice(0, 20)}...` : attachment.name}
        </h3>
        <div className="mt-1 flex justify-between">
          <p className="text-xs">
            Size:{' '}
            <span className="text-[#FFB73E]">{convertBytesToMB(attachment.size).toFixed(2)}</span>
          </p>
          <AttachmentDownload attachment={attachment} />
        </div>
      </div>
    </div>
  );
};

type AttachmentDownloadProps = {
  attachment: Attachment;
};
const AttachmentDownload = ({ attachment }: AttachmentDownloadProps) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = attachment.url;
    link.setAttribute('download', `${attachment.name}`);
    link.setAttribute('target', '_blank');
    link.style.display = 'none'; // Hide the link element

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    document.body.removeChild(link);
  };

  return (
    <>
      <Button
        type="button"
        variant="text"
        size="sm"
        className="!text-[#0DB153] text-xs"
        startIcon={<DownloadSvg />}
        onClick={handleDownload}
      >
        Download File
      </Button>
    </>
  );
};
