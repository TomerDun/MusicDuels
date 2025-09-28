import React from "react"

type props = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    blur?: boolean,
    children?: React.ReactNode

}


export default function Modal({ isOpen, setIsOpen, blur = true, children }: props) {

    function handlecontainerClick() {
        setIsOpen(false);
    }


    if (!isOpen) return null;

    return (
       <div id="modal-container" className={`bg-gray-400/20 fixed inset-0 flex items-center justify-center z-20 ${blur && 'backdrop-blur-sm'}`} onClick={handlecontainerClick}>
            {/* <div id="modal-content" className="max-w-6xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}> */}
            <div id="modal-content" className="w-full max-w-6xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}