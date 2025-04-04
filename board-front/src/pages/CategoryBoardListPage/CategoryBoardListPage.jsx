/**@jsxImportSource @emotion/react */
import * as s from './style';
import React, { useEffect, useRef } from 'react';
import { GrView } from 'react-icons/gr';
import { FcLike } from 'react-icons/fc';
import { useGetCategoryBoardList } from '../../queries/boardQuery';
import { useParams } from 'react-router-dom';

function CategoryBoardListPage(props) {
    const params = useParams();
    const categoryboardList = useGetCategoryBoardList(params.categoryName);
    const loadMoreRef = useRef(null);

    useEffect(() => {
        console.log(categoryboardList.data);
    }, [categoryboardList.data])
    
    useEffect(() => {
        const observerCallback = (entries) => {
            //console.log(entries);
            const [entry] = entries;
            if(entry.isIntersecting) {
                //console.log("다음 페이지 데이터 refetch해줘!")
                categoryboardList.fetchNextPage();
                //옵져버 작동 시 다음페이지로
            }
        }

        const observerOption = {
            threshold: 1.0
        } 

        //옵져버는 옵져버영역이 화면에 노출될 경우 작동한다.
        const observer = new IntersectionObserver(observerCallback, observerOption);
        observer.observe(loadMoreRef.current);
    }, [])

    return (
        <div css={s.scrollLayout}>
            <div css={s.cardLayoutGroup}>
                {
                    categoryboardList.isLoading || 
                    categoryboardList.data.pages.map(page => 
                        page.data.boardSearchList.map(boardList => 
                            <div key={boardList.boardId} css={s.cardLayout}>
                                <header>
                                    <div css={s.headerLeft}>
                                        <div css={s.profileImgBox}>
                                            <img src={`http://localhost:8080/image/user/profile/${boardList.profileImg}`} alt="" />
                                        </div>
                                        <span>{boardList.nickname}</span>
                                    </div>
                                    <div css={s.boardCounts}>
                                        <span>
                                            <FcLike />
                                            <span>{boardList.likeCount}</span>
                                        </span>
                                        <span>
                                            <GrView />
                                            <span>{boardList.viewCount}</span>
                                        </span>
                                        </div>
                                </header>
                                <main>
                                    <h2 css={s.boardTitle}>{boardList.title}</h2>
                                </main>
                            </div>
                        )
                    )
                }
            </div>
            <div ref={loadMoreRef}></div>
        </div>
    );
}

export default CategoryBoardListPage;