import React, { useEffect, useState } from "react";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

interface IProps {
    children: React.ReactNode;
    y?: number;
    duration?: number, 
    delay?: number
}

function Reveal({ children, y = 75, duration = .5, delay = .12 }: IProps) {
    const [isVisible, setIsVisible] = useState<string>("hidden");
    const { ref, inView } = useInView({ threshold: 0 });

    useEffect(() => {

        if (inView) {
            setIsVisible("visible");
        }

    }, [inView]);

    return (
        <>
            <motion.div
                ref={ref}
                variants={{
                    hidden: {opacity: 0, y: y},
                    visible: {opacity: 1, y: 0}
                }}
                initial="hidden"
                animate={isVisible}
                transition={{ duration: duration, delay: delay }}
            >
                {children}
            </motion.div>
        </>
    )
}

export default Reveal;