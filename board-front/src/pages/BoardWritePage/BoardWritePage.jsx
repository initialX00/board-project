/**@jsxImportSource @emotion/react */
import * as s from './style';
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import React, { useEffect, useRef, useState } from 'react';
import { basicButton, emptyButton } from '../../styles/buttons';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { useCreateBoardMutation } from '../../mutations/boardMutation';


function BoardWritePage(props) {
    const params = useParams();
    const createBoardMutation = useCreateBoardMutation();

    const [ quill, setQuill ] = useState(null);
    const [ title, setTitle ] = useState("");
    const [ quillContent, setQuillContent ] = useState("");
    
    useEffect(() => {
        console.log(params.categoryName);
        console.log(quillContent);
    }, [quillContent]);

    const containerRef = useRef();
    useEffect(() => {
        const toolbarOptions = [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }, 'bold', 'italic', 'underline', 'strike'], // toggled buttons
            [{ 'color': [] }, { 'background': [] }, { 'align': [] }], // dropdown with defaults from theme,  // outdent/indent
            ['link', 'image', 'video', 'formula'],
        ];

        const quill = new Quill(containerRef.current, {
            modules: {
                toolbar: toolbarOptions,
            },
            theme: "snow",
            placeholder: "Write, Enter your content..."
        });

        setQuill(quill);

        quill.on('text-change', () => {
            setQuillContent(quill.root.innerHTML); //html 코드를 그대로 데이터베이스에 저장, 불러올때도 코드로 불러온다
        });
    }, []);

    const handleTitleOnChange = (e) => {
        setTitle(e.target.value);
    }

    const handleSaveOnClick = async () => {
        if(!title.trim()) {
            await Swal.fire({
                titleText: "제목을 입력하세요.",
                confirmButtonText: "확인",
            });
            return;
        }

        if(!quill.root.innerText.trim()) { //quill이 항상 p태그에 감싸져있으므로 innerText로 빈문자열인지 확인
            await Swal.fire({
                titleText: "게시글 내용을 입력하세요.",
                confirmButtonText: "확인",
            });
            //console.log(quill.root.innerText);
            return
        }

        const board = {
            title,
            content: quillContent,
            categoryName: params.categoryName,
        }

        const response = await createBoardMutation.mutateAsync(board);
        await Swal.fire({
            titleText: "게시글 작성 완료",
            confirmButtonText: "확인",
        });
    }

    return (
        <div css={s.quillEditor}>
            <div css={s.quillTop}>
                <input type="text" placeholder='Enter board title...'
                    value={title} onChange={handleTitleOnChange}
                />
                <button css={s.saveButton} onClick={handleSaveOnClick}>Save</button>
            </div>
            <div ref={containerRef} />
        </div>
    );
}
    

export default BoardWritePage;