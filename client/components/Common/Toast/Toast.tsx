import toast from 'react-hot-toast';


export const ToastSuccess = (message: string | undefined): void => {
    if (message) {
        toast.error(message, {
            icon: '👍',
            style: {
                borderRadius: '5px',
                color: 'var(--second)',
                fontWeight: 500,
            },
        });
    }
};

export const ToastError = (message: string | undefined): void => {
    if (message) {
        toast.error(message, {
            icon: '👎',
            style: {
                borderRadius: '5px',
                color: 'var(--error)',
                fontWeight: 500,
            },
        });
    }
};