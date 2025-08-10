"use client";

import { useParams, useRouter} from "next/navigation";
import css from "./NotePreview.client.module.css"
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Modal from "@/components/Modal/Modal";

const NoteDetailsClient = () => {

    const {id} = useParams<{id: string}>()
    const router = useRouter();
    const {data:note, isLoading, error} = useQuery({
        queryKey: ['note', id],
        queryFn: ()=> fetchNoteById(id),
        refetchOnMount: false,
    })
    
const close = () => router.back();
    if (isLoading) {
      return <Loader/>
    }

    if (error || !note) {
      return <ErrorMessage/>
    }

  return (
    <Modal closeModal={close}>
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note?.title}</h2>
        </div>
        <p className={css.content}>{note?.content}</p>
        <p className={css.date}>{note?.createdAt}</p>
      </div>
    </div>
    </Modal>
  );
};

export default NoteDetailsClient
