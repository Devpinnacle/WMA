import { useEffect } from "react";

const useOutsideClick = (ref, callback) => {
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!ref?.current?.contains(e.target)) {
                callback();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    })
}
export default useOutsideClick