// components/BackgroundGradient.tsx
export default function BackgroundGradient() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,var(--golden-bronze)_0%,transparent_50%)]"
    />
  );
}