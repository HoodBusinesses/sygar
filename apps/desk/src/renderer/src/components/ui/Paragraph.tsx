import { useTranslate } from '@renderer/hooks/useTranslate';

interface ParagraphProps {
    paragraph: string
    span?: string
}

const Paragraph: React.FC<ParagraphProps> = ({ paragraph, span }) => {
    const { t } = useTranslate()
    return (
        <p className={'font-poppins font-normal  text-sm'}>
            {t(paragraph)} {' '}
            {span ? <span className={'font-poppins text-sm font-bold'}>{t(span)}</span> : null}    
        </p>
    )
}

export default Paragraph