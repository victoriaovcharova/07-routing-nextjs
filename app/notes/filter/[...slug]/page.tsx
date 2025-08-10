
import {fetchNotes} from "@/lib/api"
import NotesClients from "./Notes.client";


type Props = {
  params: Promise<{slug: string[]}>;
}

export default async function Notes({params}:Props){
  const {slug} = await params
  console.log(slug[0])

  const initialPage = 1;
  const initialSearch = '';
  const initialTag = slug[0] === 'All' ? '' : slug[0];

  const initialData = await fetchNotes({page: initialPage, search: initialSearch, tag: initialTag})
    console.log(initialData)

  return (
    <>
    <NotesClients initialData={initialData} initialPage={initialPage} initialSearch={initialSearch} initialTag={initialTag}/>
    </>)   
}



