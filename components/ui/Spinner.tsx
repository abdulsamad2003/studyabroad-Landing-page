type SpinnerProps = {
  size?: "sm" | "md" | "lg";
};

export default function Spinner({ size = "md" }: SpinnerProps) {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 spinner-${size}`}
      role="status"
      aria-label="Loading"
    />
  );
}
