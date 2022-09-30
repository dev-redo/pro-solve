import { Timestamp } from 'firebase/firestore';

const formatTimestampToDate = ({ seconds, nanoseconds }: Timestamp) => {
  return new Date(seconds * 1000 + nanoseconds / 1000000);
};

export { formatTimestampToDate };
