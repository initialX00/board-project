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

function BoardListPage(props) {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1");
    const order = searchParams.get("order") || "recent";
    const searchText = searchParams.get("searchText") || "";
    const searchBoardList = useGetSearchBoardList();
    
    const orderSelectOptions = [
        {label: "최근 게시글 순", value: "recent"},
        {label: "오래된 게시글 순", value: "oldest"},
        {label: "조회수 많은 순", value: "viewDesc"},
        {label: "조회수 적은 순", value: "viewAsc"},
        {label: "좋아요 많은 순", value: "likesDesc"},
        {label: "좋아요 적은 순", value: "likesAsc"},
    ];

    return (
        <div css={s.container}>
            <div css={s.header}>
                <div css={s.title}>
                    <h2>전체 게시글</h2>
                </div>
                <div css={s.searchItems}>
                    <Select //임폴트 경로에서 /base 지우기
                        options={orderSelectOptions}
                        styles={{
                            control: (style) => ({
                                ...style,
                                width: "11rem",
                                minHeight: "3rem",
                            }),
                            dropdownIndicator: (style) => ({
                                ...style,
                                padding: "0.3rem",
                            })
                        }} //글자 수에 따라 크기가 변하므로 크기 고정
                    />
                    <div css={s.searchInputBox}>
                        <input type="text" />
                        <button css={emptyButton}><BiSearch /></button>
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
                    <div><GoChevronLeft /></div>
                    <div css={s.pageNum(page === 1)}><span>1</span></div>
                    <div css={s.pageNum(page === 2)}><span>2</span></div>
                    <div css={s.pageNum(page === 3)}><span>3</span></div>
                    <div css={s.pageNum(page === 4)}><span>4</span></div>
                    <div css={s.pageNum(page === 5)}><span>5</span></div>
                    <div><GoChevronRight /></div>
                </div>
            </div>
        </div>
    );
}

export default BoardListPage;