/**@jsxImportSource @emotion/react */
import Select from 'react-select';
import * as s from './style';
import { emptyButton } from '../../styles/buttons';
import { BiSearch } from 'react-icons/bi';
import { GrView } from 'react-icons/gr';
import { FcLike } from 'react-icons/fc';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { useSearchParams } from 'react-router-dom';
import { useGetSearchBoardList } from '../../queries/boardQuery';
import { useEffect, useState } from 'react';
import { useQueries } from '@tanstack/react-query';

function BoardListPage(props) {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1");
    const order = searchParams.get("order") || "recent";
    const searchText = searchParams.get("searchText") || "";
    const searchBoardList = useGetSearchBoardList({
        page,
        limitCount: 15,
        order,
        searchText,
    });

    const [ pageNumbers, setPageNumbers ] = useState([]);
    const [ searchInputValue, setSearchInputValue ] = useState(searchText);
    
    const orderSelectOptions = [
        {label: "최근 게시글 순", value: "recent"},
        {label: "오래된 게시글 순", value: "oldest"},
        {label: "조회수 많은 순", value: "viewDesc"},
        {label: "조회수 적은 순", value: "viewAsc"},
        {label: "좋아요 많은 순", value: "likesDesc"},
        {label: "좋아요 적은 순", value: "likesAsc"},
    ];

    useEffect(() => {
        if(!searchBoardList.isLoading) {
            const currentPage = searchBoardList?.data?.data.page || 1; //데이터 자체가 없으면 참조할 때 오류가 날 수도 있기에 ?를 붙인다
            const totalPages = searchBoardList?.data?.data.totalPages || 1;
            //console.log(currentPage, totalPages);
            const startIndex = Math.floor((currentPage - 1) / 5) * 5 + 1; //vs는 int타입이 아니라 number타입이라서 Math.floor로 소수점 제거
            const endIndex = startIndex + 4 > totalPages ? totalPages : startIndex + 4;

            let newPageNumbers = [];
            for(let i = startIndex; i <= endIndex; i++) {
                newPageNumbers = [...newPageNumbers, i];
                //newPageNumbers.push(i + 1); 같다
            }
            setPageNumbers(newPageNumbers);
        }
    }, [searchBoardList.data]);

    useEffect(() => {
        searchBoardList.refetch();
    
    }, [searchParams]);

    const handlePageNumbersOnClick = (pageNumber) => {
        searchParams.set("page", pageNumber);
        setSearchParams(searchParams);
    }

    const handleSelectOnChange = (option) => {
        //console.log(option); 객체 전체를 가져오므로 값을 추출한다.
        searchParams.set("order", option.value);
        setSearchParams(searchParams); //searchParam값이 변함에 따라 useEffect로 값을 다시 불러온다.
    }

    const handleSearchButtonOnClick = () => {
        searchParams.set("page", 1);
        searchParams.set("searchText", searchInputValue);
        setSearchParams(searchParams);
    }

    const handleSearchInputOnKeyDown = () => {
        if(e.keyCoke === 13) {
            handleSearchButtonOnClick();
        }
    }

    return (
        <div css={s.container}>
            <div css={s.header}>
                <div css={s.title}>
                    <h2>전체 게시글</h2>
                </div>
                <div css={s.searchItems}>
                    <Select //임폴트 경로에서 /base 지우기
                        options={orderSelectOptions}
                        styles={{ //글자 수에 따라 크기가 변하므로 크기 고정
                            control: (style) => ({
                                ...style,
                                width: "11rem",
                                minHeight: "3rem",
                            }),
                            dropdownIndicator: (style) => ({
                                ...style,
                                padding: "0.3rem",
                            })
                        }} 
                        //정렬 기준 유지하기
                        value={orderSelectOptions.find((option) => option.value === order)}
                        onChange={handleSelectOnChange}
                    />
                    <div css={s.searchInputBox}>
                        <input type="text" value={searchInputValue} onChange={(e) => setSearchInputValue(e.target.value)} onKeyDown={handleSearchInputOnKeyDown} />
                        <button css={emptyButton} onClick={handleSearchButtonOnClick}><BiSearch /></button>
                    </div>
                </div>
            </div>
            <div css={s.main}>
                <ul css={s.boardListContainer}>
                    <li>
                        <div>No.</div>
                        <div>Title</div>
                        <div>Writer</div>
                        <div>Count</div>
                        <div>Date</div>
                    </li>
                    {
                        searchBoardList.isLoading ||
                        searchBoardList.data.data.boardSearchList.map(boardList => 
                            <li key={boardList.boardId}>
                                <div>{boardList.boardId}</div>
                                <div>{boardList.title}</div>
                                <div css={s.boardWriter}>
                                    <div>
                                        <img src={`http://localhost:8080/image/user/profile/${boardList.profileImg || "default.png"}`} alt="" />
                                    </div>
                                    <span>{boardList.nickname}</span>
                                </div>
                                <div css={s.boardCounts}>
                                    <span>
                                        <GrView />
                                        <span>{boardList.viewCount}</span>
                                    </span>
                                    <span>
                                        <FcLike />
                                        <span>{boardList.likeCount}</span>
                                    </span>
                                </div>
                                <div>{boardList.createdAt}</div>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div css={s.footer}>
                <div css={s.pageNumbers}>
                    <button disabled={searchBoardList?.data?.data.firstPage} onClick={() => handlePageNumbersOnClick(page - 1)}><GoChevronLeft /></button>
                    {
                        pageNumbers.map(number =>
                            <button key={number} css={s.pageNum(page === number)} onClick={() => handlePageNumbersOnClick(number)}><span>{number}</span></button>
                        )
                    }
                    <button disabled={searchBoardList?.data?.data.lastPage}  onClick={() => handlePageNumbersOnClick(page + 1)}><GoChevronRight /></button>
                </div>
            </div>
        </div>
    );
}

export default BoardListPage;