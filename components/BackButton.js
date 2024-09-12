"use client"; 

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-4 text-[#2d7942] hover:underline font-bold text-xl"
    >
      ← Back
    </button>
  );
}
