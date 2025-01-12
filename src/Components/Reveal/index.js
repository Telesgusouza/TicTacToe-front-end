import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
function Reveal(_a) {
    var children = _a.children, _b = _a.y, y = _b === void 0 ? 75 : _b, _c = _a.duration, duration = _c === void 0 ? .5 : _c, _d = _a.delay, delay = _d === void 0 ? .12 : _d;
    var _e = useState("hidden"), isVisible = _e[0], setIsVisible = _e[1];
    var _f = useInView({ threshold: 0 }), ref = _f.ref, inView = _f.inView;
    useEffect(function () {
        if (inView) {
            setIsVisible("visible");
        }
    }, [inView]);
    return (_jsx(_Fragment, { children: _jsx(motion.div, { ref: ref, variants: {
                hidden: { opacity: 0, y: y },
                visible: { opacity: 1, y: 0 }
            }, initial: "hidden", animate: isVisible, transition: { duration: duration, delay: delay }, children: children }) }));
}
export default Reveal;
