import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

export interface ISelectOption {
    id: string
    name: string
}

interface ISelectProps {
    value: string
    setValue: (value: number) => void
    options: ISelectOption[]
}

export const Select = ({ value, setValue, options }: ISelectProps) => {
    const [isOpen, setOpen] = useState(false);

    const handlePropagation = (event: React.MouseEvent) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
    };

    const handleOpenSelect = () => {
        setOpen(!isOpen);
    };

    const handleSelect = (event: React.MouseEvent) => {
        const elem = event.target as HTMLElement;
        const id = elem.dataset.id;
        setValue(Number(id));
        setOpen(false);
    };

    useEffect(() => {
        const handleClose = () => { setOpen(false); };
        window.document.body.addEventListener('click', handleClose);
        return () => {
            window.document.body.removeEventListener('click', handleClose);
        };
    }, []);

    return (
        <div className={styles.wrapper} onClick={handlePropagation}>
            <div className={styles.label} onClick={handleOpenSelect}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99992 1.33337C4.33325 1.33337 1.33325 4.33337 1.33325 8.00004C1.33325 11.6667 4.33325 14.6667 7.99992 14.6667C11.6666 14.6667 14.6666 11.6667 14.6666 8.00004C14.6666 4.33337 11.6666 1.33337 7.99992 1.33337ZM2.86659 9.33337C2.73325 8.86671 2.66659 8.46671 2.66659 8.00004C2.66659 7.53337 2.73325 7.13337 2.86659 6.66671H4.13325C3.99992 7.53337 3.99992 8.46671 4.13325 9.33337H2.86659ZM3.39992 10.6667H4.33325C4.46659 11.2667 4.66659 11.8667 4.99992 12.4C4.33325 11.9334 3.79992 11.3334 3.39992 10.6667ZM4.33325 5.33337H3.39992C3.79992 4.66671 4.33325 4.06671 4.99992 3.60004C4.66659 4.13337 4.46659 4.73337 4.33325 5.33337ZM7.33325 13.1334C6.53325 12.5334 5.93325 11.6667 5.73325 10.6667H7.33325V13.1334ZM7.33325 9.33337H5.39992C5.33325 8.86671 5.33325 8.46671 5.33325 8.00004C5.33325 7.53337 5.33325 7.13337 5.39992 6.66671H7.33325V9.33337ZM7.33325 5.33337H5.73325C5.93325 4.33337 6.53325 3.46671 7.33325 2.86671V5.33337ZM12.5999 5.33337H11.6666C11.5333 4.73337 11.3333 4.13337 10.9999 3.60004C11.6666 4.06671 12.1999 4.66671 12.5999 5.33337ZM8.66659 2.86671C9.46659 3.46671 10.0666 4.33337 10.2666 5.33337H8.66659V2.86671ZM8.66659 13.1334V10.6667H10.2666C10.0666 11.6667 9.46659 12.5334 8.66659 13.1334ZM10.5999 9.33337H8.66659V6.66671H10.5999C10.6666 7.53337 10.6666 8.46671 10.5999 9.33337ZM11.0666 12.4C11.3333 11.8667 11.5333 11.2667 11.7333 10.6667H12.6666C12.1999 11.3334 11.6666 11.9334 11.0666 12.4ZM11.9333 9.33337C12.0666 8.46671 12.0666 7.53337 11.9333 6.66671H13.1999C13.4666 7.53337 13.4666 8.46671 13.1999 9.33337H11.9333Z" fill="#BFC5CA"/>
                </svg>
                <span>{value}</span>
            </div>
            <div className={cx({
                [styles.modal]: true,
                [styles.modal_opened]: isOpen,
            })}>
                {options.map((item) => {
                    return (
                        <p className={cx({
                                [styles.option]: true,
                                [styles.option_selected]: value === item.id,
                            })}
                            key={item.id}
                            data-id={item.id}
                            onClick={handleSelect}>
                            {item.name}
                        </p>
                    );
                })}
            </div>
        </div>
    );
};
