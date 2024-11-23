import { ReactNode } from 'react';

export interface ModalProps {
	isActive: boolean,
	setIsActive: (e: any) => void,
	children: ReactNode,
}