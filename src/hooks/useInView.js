import { useEffect, useRef, useState } from "react";

export const useInView = (options = {}) => {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const [blur, setBlur] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(entry.target);
            }
        }, {
            threshold: 0.1,
            ...options,
        });

        const current = ref.current;
        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, [options]);

    // Handle blur effect as sections scroll
    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate blur based on scroll position
            // Blur increases as section exits from bottom
            if (rect.bottom < windowHeight) {
                const blurAmount = Math.min(15, (windowHeight - rect.bottom) / 20);
                setBlur(blurAmount);
            } else if (rect.top > 0) {
                setBlur(0);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return [ref, isInView, blur];
};
