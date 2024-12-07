import React from 'react'
import { Button } from './ui/button';
import { useTranslate } from '@renderer/hooks/useTranslate';
interface RedirectButtonProps {
    text: string;
    click: () => void;
}

const RedirectButton: React.FC<RedirectButtonProps> = ({ text, click }) => {
    const { t } = useTranslate();
    return (
        <Button
            className="hover:underline text-blue-500 px-4 py-1 font-poppins font-bold  text-sm"
            onClick={click}
        >
            {t(text)}
        </Button>
    );
}

export default RedirectButton;