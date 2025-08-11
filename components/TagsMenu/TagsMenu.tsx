'use client'
import { useState } from "react";
import css from "./TagsMenu.module.css";
import Link from "next/link";

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);


  const tags = [
    "All",
    "Todo",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
  ];
  const openTags= () => {
    setIsOpen(!isOpen)
  }

  const handleClickLink = () =>{
    setIsOpen(false)
  }

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={openTags}>
        {isOpen ? "Notes ▴" : "Notes ▾"}
      </button>
        {isOpen && (
            <ul className={css.menuList}>
        {tags.map((tag) => (
          <li className={css.menuItem} key={tag}>
            <Link
              href={`/notes/filter/${tag}`}
              className={css.menuLink}
              onClick={handleClickLink}
            >{tag}</Link>
          </li>))}
              </ul>)}
    </div>
  );
};

export default TagsMenu;