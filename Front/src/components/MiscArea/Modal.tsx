import React from "react"

type props = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    blur?: boolean,
    children?: React.ReactNode

}


export default function Modal({ isOpen, setIsOpen, blur = true, children }: props) {

    function handlecontainerClick(e: React.MouseEvent) {
        // e.stopPropagation();
        setIsOpen(false);
    }


    if (!isOpen) return null;

    return (
        <div id="modal-container" className={`bg-gray-400/20 fixed inset-0 flex items-center justify-center z-20 ${blur && 'backdrop-blur-sm'}`} onClick={handlecontainerClick}>
            <div id="modal-content" className="" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}