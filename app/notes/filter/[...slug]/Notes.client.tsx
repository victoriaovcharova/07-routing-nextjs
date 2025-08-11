"use client";
import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { toast, Toaster } from "react-hot-toast";

import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import TagsMenu from "@/components/TagsMenu/TagsMenu";
import { Note } from "@/types/note";

import css from "./NotePage.module.css";

interface Props {
  initialData: {
    notes: Note[];
    totalPages: number;
  };
  initialTag: string;
}

const NotesClients = ({ initialData, initialTag }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [tag, setTag] = useState<string>(initialTag);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search.trim(), 500);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    setTag(initialTag);
    setPage(1);
  }, [initialTag]);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes(
        debouncedSearch === ""
          ? { page, tag }
          : { page, search: debouncedSearch, tag }
      ),
    initialData:
      page === 1 && debouncedSearch === "" && tag === initialTag
        ? initialData
        : undefined,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (!data) return;
    if (data.notes.length === 0 && (debouncedSearch !== "" || tag)) {
      toast.error("No notes found for your request.");
    }
  }, [data, debouncedSearch, tag]);

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <Toaster position="top-center" />
      <header className={css.toolbar}>
        {/* Меню тегов само делает навигацию через <Link /> */}
        <TagsMenu />
        <SearchBox value={search} onChange={handleSearchChange} />
        {isSuccess && totalPages > 1 && (
          <Pagination total={totalPages} page={page} onChange={setPage} />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      <NoteList notes={notes} />

      {isModalOpen && (
        <Modal closeModal={() => setIsModalOpen(false)}>
          <NoteForm closeModal={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClients;
