
import axios from "axios";
import type { Note, NewNote } from "@/types/note";


interface NoteHttpResponse {
  notes: Note[];
  totalPages: number;
}

interface fetchNotesProps {
  page: number;
  search?:string;
  tag?: string;
}


const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;


export async function fetchNotes({page, search, tag}:fetchNotesProps): Promise<NoteHttpResponse> {
  const url = `https://notehub-public.goit.study/api/notes`;
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
    params: {
      page,
      perPage: 12,
      ...(search && { search}),
      ...(tag && { tag }),
    }
  };

  const response = await axios.get<NoteHttpResponse>(url, options);
  return response.data;
}


export async function postNote(values: NewNote): Promise<Note> {
  const url = `https://notehub-public.goit.study/api/notes`;
  const options = {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${myKey}`,
    }
  };

    const response = await axios.post<Note>(url,values, options)
    return response.data;
}


export async function deleteNote(noteId: string){
  const url = `https://notehub-public.goit.study/api/notes/${noteId}`;
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    }
  };

    const response = await axios.delete<Note>(url, options)
    return response.data;
}

export async function fetchNoteById(noteId:string) {
  const url = `https://notehub-public.goit.study/api/notes/${noteId}`;
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    }
  };

  const response= await axios.get<Note>(url, options)
  return response.data
  
}