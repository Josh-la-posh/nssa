import { ReactComponent as BigDocumentPreview } from '@/assets/icons/bg-document.svg';
import { ReactComponent as BigExcelDocumentPreview } from '@/assets/icons/bg-excel-document.svg';
import { ReactComponent as BigPdfDocumentPreview } from '@/assets/icons/bg-pdf-document.svg';
import { ReactComponent as BigWordDocumentPreview } from '@/assets/icons/bg-word-document.svg';
import { ReactComponent as PDF } from '@/assets/icons/pdf.svg';
import { ReactComponent as SmallDocumentPreview } from '@/assets/icons/sm-document.svg';
import { ReactComponent as SmallExcelDocumentPreview } from '@/assets/icons/sm-excel-document.svg';
import { ReactComponent as SmallPdfDocumentPreview } from '@/assets/icons/sm-pdf-document.svg';
import { ReactComponent as SmallWordDocumentPreview } from '@/assets/icons/sm-word-document.svg';

type DocumentTypeProp = {
  type: string;
  size?: string;
};
export const DocumentType = ({ type, size }: DocumentTypeProp) => {
  if (
    type.includes('.application/vnd.openxmlformats-officedocument.wordprocessingml.document') ||
    type.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document') ||
    type.includes('application/vnd.oasis.opendocument.text') ||
    type.includes('application/vnd.ms-word.document.macroenabled.12') ||
    type.includes('application/vnd.ms-word.template.macroenabled.12') ||
    type.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.template') ||
    type.includes('application/msword')
  ) {
    if (size === 'lg') {
      return <BigWordDocumentPreview />;
    } else {
      return <SmallWordDocumentPreview />;
    }
  } else if (type.includes('.application/pdf') || type.includes('application/pdf')) {
    if (size === 'lg') {
      return <BigPdfDocumentPreview />;
    } else {
      return <SmallPdfDocumentPreview />;
    }
  } else if (
    type.includes('.application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ||
    type.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ||
    type.includes('application/vnd.ms-excel') ||
    type.includes('text/csv') ||
    type.includes('text/xls') ||
    type.includes('text/xml')
  ) {
    if (size === 'lg') {
      return <BigExcelDocumentPreview />;
    } else {
      return <SmallExcelDocumentPreview />;
    }
  } else {
    if (size === 'lg') {
      return <BigDocumentPreview />;
    } else {
      return <SmallDocumentPreview />;
    }
  }
  return <PDF className="h-[62px] w-auto" />;
};
