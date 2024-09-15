import css from "./styles.module.css";

const Popup = ({ show, setShow, children }) => {
  if (!show) {
    return null;
  }
  return (
    <div className={css.overlay} onClick={() => setShow(false)}>
      <div
        className={`${css.popup} ${show ? css.popup__active : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Popup;
