
interface ModalProps{
    modalOpen: boolean;
    setModelOpen: (open: boolean) => boolean | void;
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({modalOpen, setModelOpen, children})=>{
    return (
        <div className={`modal ${modalOpen ? "modal-open" :""}`}>
            <div className="modal-box bg-slate-100">
            
                <button onClick={() =>setModelOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                {children}
               
            </div>
        </div>
    )  
}
export default Modal;
