import { useState } from "react"

export const useInputValid = ({regexp, errorText}) => {
    const [ name, setName ] = useState("");
    const [ value, setValue ] = useState("");
    const [ errorMessage, setErrorMessage] = useState("");  

    const handleOnChange = (e) => {
        setName(e.target.name);
        setValue(e.target.value);
    };

    const handleOnBlur = () => {
        const text = regexp.test(value) ? "" : errorText;
        setErrorMessage(text);
    };

    return { name, value, errorMessage, handleOnBlur, handleOnChange };
}; //"name": name 객체의 키값이 같으면 생략가능
