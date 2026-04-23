import { useClickOutside } from "@/presentation/hooks/useClickOutside";
import { useState, useRef } from "react";
import { SelectOption } from "./Select";

interface UseSelectProps {
  value?: string;
  onChange: (value: string) => void;
  options: SelectOption[];
}

export const useSelect = ({ value, onChange, options }: UseSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside([containerRef], () => setIsOpen(false));

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return { isOpen, setIsOpen, selectedOption, handleSelect, containerRef };
};
