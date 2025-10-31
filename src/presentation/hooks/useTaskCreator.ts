import { useState } from 'react';
import type { CreateTaskPayload } from '@/infrastructure/types/task.types';

export const useTaskCreator = () => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen(prev => !prev);

    return {
        isOpen,
        open,
        close,
        toggle,
    };
};
