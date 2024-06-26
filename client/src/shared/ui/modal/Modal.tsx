import { ReactNode } from 'react'
import BaseModal from 'react-modal'

import css from './Modal.module.css'

type Props = {
    isOpen: boolean
    children: ReactNode
}

export const Modal = ({
    isOpen,
    children,
}: Props) => {

    return(
        <BaseModal
            isOpen={isOpen}
            bodyOpenClassName={css.body}
            portalClassName={css.portal}
            overlayClassName={css.overlay}
            className={css.content}
            closeTimeoutMS={250}
            ariaHideApp={false}
        >
            {children}
        </BaseModal>
    )
}