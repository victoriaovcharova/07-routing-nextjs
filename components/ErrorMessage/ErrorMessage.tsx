import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return (
    <>
      <p className={css.error_text}>
        <hr />
        There was an error, please try again...
      </p>
    </>
  );
}
