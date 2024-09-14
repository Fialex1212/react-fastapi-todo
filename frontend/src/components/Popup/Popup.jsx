import css from './styles.module.css'

const Popup = ({show, setShow, Children}) => {
    if (!show){
        return null
    }
  return (
    <div className={`${css.popup} ${show? css.popup__active: ""}`}>
        <button onClick={() => setShow(false)}>Close</button>
        {Children}
    </div>
  )
}

export default Popup
