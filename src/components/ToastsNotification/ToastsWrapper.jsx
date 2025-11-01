import './ToastsWrapper.scss';


const ToastsWrapper = ({toastsData}) => {
    return (
        <div className='toasts-wrapper'>
            <ul className='toasts-container'>
                {toastsData.map((toast) => (
                    <li key={toast.id} className={`toast-element ${toast.type}`}>
                        <p>{toast.message}</p>
                        <span>{toast.type}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ToastsWrapper;