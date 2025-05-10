import { useState, ChangeEvent } from "react";

export function useFormState(initialValues: Record<string, any>) {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, type, value, files } = e.target;
    if (type === "file" && files) {
      setValues((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
  }

  return { values, errors, handleChange, setErrors };
}
