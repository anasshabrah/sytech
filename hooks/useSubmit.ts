import { useState } from "react";

export function useSubmit() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(url: string, options: RequestInit) {
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const response = await fetch(url, options);
      const contentType = response.headers.get("Content-Type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error(`Invalid Content-Type: ${contentType}`);
      }
      const data = await response.json();
      if (response.ok && data.success) {
        setSuccess(data.message || "نجح الإرسال");
      } else {
        setError(data.message || "حدث خطأ");
      }
    } catch (err: any) {
      setError(err.message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  }

  return { loading, success, error, submit };
}
