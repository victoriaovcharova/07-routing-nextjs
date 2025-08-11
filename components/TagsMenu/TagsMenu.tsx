"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import css from "./TagsMenu.module.css";

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Отображаемые названия тегов
  const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

  // slug для URL – в нижнем регистре и url-encoded
  const toSlug = (label: string) =>
    encodeURIComponent(label.toLowerCase());

  const toggle = () => setIsOpen((v) => !v);
  const close = () => setIsOpen(false);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggle}>
        {isOpen ? "Notes ▴" : "Notes ▾"}
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li className={css.menuItem} key={tag}>
              <Link
                href={`/notes/filter/${toSlug(tag)}`}
                className={css.menuLink}
                onClick={close}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
