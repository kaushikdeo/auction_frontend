import { useSpring, animated, useTransition } from '@react-spring/web';
import './modalComponent.scss';

const Modal = ({ children, isOpen, onClose }) => {
    const modalTransition = useTransition(isOpen, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 1 },
        config: {
            duration: 300
        }
    })
    const springs = useSpring({
        opacity: isOpen ? 1 : 0,
        config: {
            duration: 300
        }
    })
    return modalTransition((styles, isOpen) => isOpen && (
        <animated.div style={styles} className="react-modal-overlay" onClick={onClose}>
            <animated.div style={springs} className="react-modal-wrapper" onClick={e => e.stopPropagation()}>
                    {children}
                    <button type="button" onClick={onClose}>Close</button>
            </animated.div>
        </animated.div>
    )
    )
}

export default Modal