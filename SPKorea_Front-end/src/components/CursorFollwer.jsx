import { useEffect, useRef, useState } from 'react';
import cursorImg from '../assets/img/cursor.png';

const CursorFollower = () => {
    const cursorRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            const isTouch = window.matchMedia('(pointer: coarse)').matches;
            setIsMobile(isTouch || window.innerWidth <= 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const moveCursor = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX + 40}px`;
                cursorRef.current.style.top = `${e.clientY + 40}px`;
            }
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <img
            ref={cursorRef}
            src={cursorImg}
            alt="cursor follower"
            style={{
                position: 'fixed',
                pointerEvents: 'none',
                width: '40px',
                height: '40px',
                zIndex: 99999,
                transform: 'translate(-50%, -50%)',
            }}
        />
    );
};

export default CursorFollower;
