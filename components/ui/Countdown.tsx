"use client";

type CountdownProps = {
  targetDate: Date | string;
};

export default function Countdown({ targetDate }: CountdownProps) {
  const target = new Date(targetDate).toLocaleDateString();

  return <span>Countdown to {target}</span>;
}
