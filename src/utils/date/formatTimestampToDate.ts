interface TimestampProps {
  seconds: number;
  nanoseconds: number;
}

const formatTimestampToDate = ({ seconds, nanoseconds }: TimestampProps) =>
  new Date(seconds * 1000 + nanoseconds / 1000000);

export { formatTimestampToDate };
