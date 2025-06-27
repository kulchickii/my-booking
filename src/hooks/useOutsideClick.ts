import { useEffect, useRef } from "react"

export const useOutsideClick = (close: ()=> void, listenCapturing = true) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref = useRef<any>(null)
  
    useEffect( ()=> {
        const handleClick = (e: MouseEvent) =>  {
          if (ref.current && !ref.current.contains(e.target as Node)) close()
        }
        document.addEventListener("click", handleClick, listenCapturing);
        return () => document.removeEventListener("click", handleClick, listenCapturing);
      },
      [close, listenCapturing]
    )
    return ref
}