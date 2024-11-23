import { ModalProps } from './Modal.props';
import styles from './Modal.module.css';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import cn from 'classnames';


export const Modal = ({ isActive, setIsActive, children }: ModalProps): JSX.Element => {
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const variants = {
        visible: {
            opacity: 1,
        },
        hidden: {
            opacity: 0,
        }
    };

    const variantsModal = {
        visible: {
            transform: 'scale(1)',
        },
        hidden: {
            transform: 'scale(0.5)',
        }
    };

    const handleMouseDown = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        if (!isDragging) {
            setIsActive(false);
        }
    };

    const handleMouseMove = () => {
        setIsDragging(true);
    };

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsActive(false);
            }
        };

        document.addEventListener('keydown', handleEsc);
        
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isActive, setIsActive]);

    return (
        <motion.div className={cn(styles.modal, {
            [styles.active]: isActive,
        })} onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            variants={variants}
            initial={isActive ? 'visible' : 'hidden'}
            transition={{ duration: 0.15 }}
            animate={isActive ? 'visible' : 'hidden'}>
            <motion.div className={styles.modalContent} onClick={e => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
                onMouseMove={(e) => e.stopPropagation()}
                variants={variantsModal}
                initial={isActive ? 'visible' : 'hidden'}
                transition={{ duration: 0.15 }}
                animate={isActive ? 'visible' : 'hidden'}>
                {children}
            </motion.div>
        </motion.div>
    );
};
