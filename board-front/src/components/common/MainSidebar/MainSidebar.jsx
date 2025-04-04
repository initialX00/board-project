/**@jsxImportSource @emotion/react */
import * as s from './style';
import React from 'react';
import { FiChevronsLeft } from "react-icons/fi";
import { basicButton, emptyButton } from '../../../styles/buttons';
import { useRecoilState } from 'recoil';
import { mainSidebarIsOpenState } from '../../../atoms/mainSidebar/mainSidebarAtom';
import { LuLockKeyhole } from "react-icons/lu";
import { useUserMeQuery } from '../../../queries/userQuery';
import { Link, useNavigate } from 'react-router-dom';
import { BiEdit, BiLogOut } from "react-icons/bi";
import { setTokenLocalStorage } from '../../../configs/axiosConfig';
import { useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useGetCategories } from '../../../queries/boardQuery';

function MainSidebar(props) {
    const navigate = useNavigate();
    const [ isOpen, setOpen ] = useRecoilState(mainSidebarIsOpenState);
    const queryClient = useQueryClient();
    const loginUserData = queryClient.getQueryData(["userMeQuery"]);
    const categories = useGetCategories();

    const handleSidebarClose = () => {
        setOpen(false);
    }

    const handleAccountButtonOnClick = () => {
        navigate("/account/setting");
    }

    const handleLogoutButtonOnClick = async () => {
        setTokenLocalStorage("AccessToken", null);
        await queryClient.invalidateQueries({queryKey: ["userMeQuery"]});
        navigate("/auth/login");
    } //removeQuery는 객체를 지우고 재요청을 하지 않는다.

    const handleWriteOnClick = async (categoryName) => {
        if(!categoryName) {
            const categoryData = await Swal.fire({
                title: "카테고리명을 입력하세요",
                input: "text",
                inputPlaceholder: "Enter category name",
                showCancelButton: true,
                confirmButtonText: "작성하기",
                cancelButtonText: "취소하기",
            });
            if(categoryData.isConfirmed) {
                categoryName = categoryData.value;
            } else {
                return;
            }
        }
        navigate(`/board/write/${categoryName}`);
    }
    
    return (
        <div css={s.layout(isOpen)}>
            <div css={s.container}>
                <div>
                    <div css={s.groupLayout}>
                        <div css={s.topGroup}>
                            <div css={s.user}>
                                <button css={emptyButton} onClick={handleAccountButtonOnClick}>
                                    <span css={s.authText}>
                                        <div css={s.profileImgBox}>
                                            <img src={`http://localhost:8080/image/user/profile/${loginUserData?.data.profileImg}`} alt="" />
                                        </div>
                                        <span>{loginUserData?.data.nickname}</span>
                                    </span>
                                </button>
                            </div>
                            <button css={basicButton} onClick={handleSidebarClose}><FiChevronsLeft /></button>
                        </div>
                    </div>
                    <div css={s.groupLayout}>
                        <Link to={"/board/list?page=1&order=recent&searchText="}>
                            <button css={emptyButton}>
                                <span>
                                    전체 게시글
                                </span>
                            </button>
                        </Link>
                    </div>
                    <div css={s.groupLayout}>
                        <button css={emptyButton}>
                            <span>
                                공지사항
                            </span>
                        </button>
                    </div>
                    <div css={s.groupLayout}>
                        <div css={s.categoryItem}>
                            <button css={emptyButton}>내가 작성한 글({categories.isLoading || categories.data.data.reduce((prev, category) => {prev + category.boardCount}, 0)})</button>
                            <button css={basicButton} onClick={() => handleWriteOnClick(null)}><BiEdit /></button>
                        </div>
                    </div>
                </div>
                <div css={s.categoryListContainer}>
                    {
                        categories.isLoading ||
                        categories.data.data.map(category =>
                            <div key={category.boardCategoryId} css={s.groupLayout}>
                                <div css={s.categoryItem}>
                                    <button css={emptyButton}>{category.boardCategoryName}({category.boardCount})</button>
                                    <button css={basicButton} onClick={() => handleWriteOnClick(category.boardCategoryName)}><BiEdit /></button>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div>
                    <div css={s.groupLayout}>
                        <button css={emptyButton} onClick={handleLogoutButtonOnClick}>
                            <span css={s.authText}>
                                <BiLogOut /> 로그아웃
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainSidebar;