/**@jsxImportSource @emotion/react */
import { useRecoilState } from 'recoil';
import * as s from './style';
import React from 'react';
import { mainSidebarIsOpenState } from '../../../atoms/mainSidebar/mainSidebarAtom';
import { FiChevronsRight } from 'react-icons/fi';
import { basicButton } from '../../../styles/buttons';

function MainContainer({ children }) {
    const [ isOpen, setOpen ] = useRecoilState(mainSidebarIsOpenState);

    const handleSidebarOpen = () => {
        setOpen(true)
    }

    return (
        <div css={s.container}>
            <header css={s.header}>
                {
                    !isOpen && 
                    <span css={s.sidebarOpenButton}>
                        <button css={basicButton} onClick={handleSidebarOpen}><FiChevronsRight /></button>
                    </span>
                }
            </header>
            <main css={s.main}>
                {children}
            </main>
        </div>
    );
}

export default MainContainer;