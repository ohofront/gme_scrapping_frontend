import { ReactNode, useCallback, useEffect, useRef } from "react";

interface ClickOutsideProps {
    onClickOutside: (e: MouseEvent) => void;
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
const ClickOutSide = ({ onClickOutside, className, style, children }: ClickOutsideProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleClick = useCallback((e: MouseEvent) => {
        const container = containerRef.current;
        const target = e.target as Element;

        if((container && container === target ) || (container && !container?.contains(target))) {
            onClickOutside(e);
        }
    },[onClickOutside]);

    useEffect(() => {
        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    })
    return(
        <div ref={containerRef} className={className} style={style}>
            {children}
        </div>
    )
}
export default ClickOutSide;