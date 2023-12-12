import { css, styled } from "styled-components"
import { loader } from "../styles/animations"

export const Container = styled.div`
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
`
export const Auth = styled.div`
    margin-bottom: 15px;
`
export const YandexLink = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
`
export const Error = styled.p`
    color: red;
`
export const InputWrapper = styled.div`
    width: 100%;
    position: relative;
    margin: 15px 0;
    /* text-align: center; */
`

export const Input = styled.input`
    opacity: 0;
    visibility: hidden;
    position: absolute;
`

export const FieldFileWrapper = styled.label`
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
`

export const FieldFileFake = styled.div`
    height: 60px;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
        justify-content: center;
    padding: 0 15px;
    border: 1px solid #c7c7c7;
`

export const fieldFileButton = css`
    width: 100%;
    height: 60px;
    background: #6082b6;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    border: none;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    &:hover {
        background: #526f9b;
    }
    &:disabled {
        background: #c7c7c7;
    }
`
export const FieldFileButtonDiv = styled.div`
  ${fieldFileButton}
`
export const FieldFileButton = styled.button`
  ${fieldFileButton}
`
export const StyledLoader = styled.div`
    animation: ${loader} 1s linear infinite;
    display: flex;
    align-items: center;
`