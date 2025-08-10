import {ChangeEvent} from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  value: string;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={onChange}
    />
  );
}