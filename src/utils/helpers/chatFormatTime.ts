import { addDays, format, formatDistanceStrict } from '@/lib/date';

export const formatChatContactCardDate = (date: Date) => {
  if (format(new Date(), 'd/MM/YYY') === format(new Date(date), 'd/MM/YYY')) {
    return format(new Date(date), 'kk:mm');
  } else if (format(new Date(), 'd/MM/YYY') === format(addDays(new Date(date), 1), 'd/MM/YYY')) {
    return 'yesterday';
  } else {
    return formatDistanceStrict(new Date(date), new Date())
      .replace('day', 'd')
      .replace('month', 'm')
      .replace('week', 'w')
      .replace('s', '')
      .replace(' ', '');
  }
};

export const formatChatMessageHeaderDate = (date: Date) => {
  if (format(new Date(), 'd/MM/YYY') === format(new Date(date), 'd/MM/YYY')) {
    return 'Today';
  } else if (format(new Date(), 'd/MM/YYY') === format(addDays(new Date(date), 1), 'd/MM/YYY')) {
    return 'Yesterday';
  } else {
    return formatDistanceStrict(new Date(date), new Date());
  }
};

export const formatNumberToTime = (num: number) => {
  if (!isNaN(num) && num >= 0) {
    const hours = Math.floor(num / 3600);
    const formatHours = hours < 10 ? `0${hours}` : hours.toString();
    const minutes = Math.floor((num % 3600) / 60);
    const formatMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const seconds = Math.floor(num % 60);
    const formatSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();

    if (formatHours === '00') {
      return `${formatMinutes}:${formatSeconds}`;
    } else {
      return `${formatHours}:${formatMinutes}:${formatSeconds}`;
    }
  }
  return '0:00';
};

interface concatenateBlobsParams {
  blobs: Blob[];
  type: string;
  callback: (blob: Blob) => void;
}

export const concatenateBlobs = ({ type, blobs, callback }: concatenateBlobsParams) => {
  const buffers: any[] = [];
  let index = 0;

  function readAsArrayBuffer() {
    if (!blobs[index]) {
      return concatenateBuffers();
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        buffers.push(event.target.result);
        index++;
        readAsArrayBuffer();
      }
    };
    reader.readAsArrayBuffer(blobs[index]);
  }
  readAsArrayBuffer();

  function concatenateBuffers() {
    let byteLength = 0;
    buffers.forEach((buffer: Buffer) => {
      byteLength += buffer.byteLength;
    });

    const tmp = new Uint16Array(byteLength);
    let lastOffset = 0;
    buffers.forEach((buffer: Uint8Array) => {
      const reuseableByteLength = buffer.byteLength;
      if (reuseableByteLength % 2 !== 0) {
        buffer = buffer.slice(0, reuseableByteLength - 1);
      }
      tmp.set(new Uint16Array(buffer), lastOffset);
      lastOffset += reuseableByteLength;
    });

    const blob = new Blob([tmp.buffer], {
      type: type,
    });

    callback(blob);
  }
};
