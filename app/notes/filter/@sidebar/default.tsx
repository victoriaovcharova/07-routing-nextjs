import Link from "next/link";
import css from "./SidebarNotes.module.css"


const NotesSidebar = ()=>{

      const tags = [
    "All",
    "Todo",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
  ];
return(
    <ul className={css.menuList}>
    {tags.map((tag)=>(
              <li className={css.menuItem} key={tag}>
                <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                {tag}
                </Link>
      </li>
    ) )}

    </ul>
)

}


export default NotesSidebar;