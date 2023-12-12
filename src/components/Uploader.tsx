import React, { FC, useEffect, useState } from 'react'
import { getAuthError } from '../store/reducers/uploadSlice'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { getUrl } from '../store/reducers/actionCreators'
import { Loader } from './img/Loader';
import { Yandex } from './img/Yandex';
import * as S from './styles';

const Uploader: FC = () => {
    const [files, setFiles] = useState<FileList | null>(null)
    const [isOverlimit, setIsOverlimit] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [token, setToken] = useState('')
    const [tokenError, setTokenError] = useState('')
    const [tokenPure, setTokenPure] = useState(true)
    const [tokenFormValid, setTokenFormValid] = useState(false)
    const [isToken, setIsToken] = useState(false)

    const dispatch = useAppDispatch()

    const {isFetching, authError} = useAppSelector(state => state.upload)

    const clientID = process.env.REACT_APP_YANDEX_CLIENTID
    const authLink = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${clientID}`

    useEffect(() => {
        if (tokenError) {
            setTokenFormValid(false)
        } else {
            if (tokenPure) {
                setTokenFormValid(false)
            } else {
                setTokenFormValid(true)
            }
        }
        let token = localStorage.getItem('oAuthToken')
        if (token) {
            dispatch(getAuthError(''))
            setIsToken(true)
        }
    }, [dispatch, token, tokenError, tokenPure])


    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            setFiles(files)
            if (files.length > 100) {
                setIsOverlimit(true)
           } else {
               setIsOverlimit(false)
               setIsDisabled(false)
           }
           if (!files.length) {
               setIsDisabled(true)
           }
        }
    }

    const handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
        if (!isOverlimit) {
            e.preventDefault()
            dispatch(getUrl(files))
            setFiles(null)
        }
        setIsDisabled(true)
    }

    const handleSubmitToken = (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        localStorage.setItem('oAuthToken', token)
        setToken('')
    }

    const handleToken = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTokenPure(false)
        setToken(e.target.value)
        const regex = /^[A-Za-z0-9-_]{58}$/
        if (!regex.test(e.target.value)) {
            setTokenError('Некорректный токен')
        } else {
            setTokenError('')
        }
    }

    const handleSubmitLogout = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        localStorage.removeItem('oAuthToken')
        setIsToken(false)
        setTokenPure(true)
    }

    return (
        <S.Container>
            <h1>Загрузите файлы на ваш Яндекс.Диск</h1>
            <p>Для доступа к Яндекс.Диску необходимо нажать кнопку "Войти с Яндекс ID". Откроется новое окно, в нем необходимо скопировать OAuth токен и вставить в форму ввода ниже</p>
            {!isToken ?
                <S.Auth>
                    <S.YandexLink>
                        <a href={authLink} target='_blank' rel="noreferrer"><Yandex /></a>
                    </S.YandexLink>
                    <form onSubmit={handleSubmitToken}>
                        <input name="token" placeholder='Введите токен' value={token} onChange={handleToken}/>
                        <button type="submit" disabled={!tokenFormValid}>Отправить</button>
                        {tokenError && <S.Error>{tokenError}</S.Error>}
                    </form>
                </S.Auth>
                :
                <form onSubmit={handleSubmitLogout}>
                    <button type="submit">Выйти из Яндекс.Диска</button>
                </form>
            }
            <form onSubmit={handleSubmit}>
                {isToken &&
                    <S.InputWrapper>
                        <S.Input type="file" multiple name="file" id='file' onChange={handleFileUpload}/>
                        <S.FieldFileWrapper htmlFor='file'>
                            <S.FieldFileFake>{files?.length ? 'Выбрано файлов: ' + files.length : 'Файлы не выбраны' }</S.FieldFileFake>
                            <S.FieldFileButtonDiv>Выбрать файлы</S.FieldFileButtonDiv>
                        </S.FieldFileWrapper>
                    </S.InputWrapper>
                }
                {isOverlimit && <p>Максимально можно загрузить 100 файлов одновременно. </p>}
                <S.FieldFileButton type="submit" disabled={isDisabled || isFetching}>
                    {isFetching ? 'Идет загрузка файлов' : 'Загрузить'}
                    {isFetching && <S.StyledLoader><Loader/></S.StyledLoader>}
                </S.FieldFileButton>
                <S.Error>{authError}</S.Error>
            </form>
        </S.Container>
     );
}

export default Uploader




