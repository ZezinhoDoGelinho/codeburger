import styled from 'styled-components'

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const LogoImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 470px;
    height: 70%;
    border-radius: 10px 0px 0px 10px;

    background: #9758A6;
`

export const ContainerItens = styled.div`
    background:#DCDCDC;
    border-radius: 0 10px 0 10px;
    height: 70%;
    padding: 25px 75px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0px 4px 15px 0px #4A90E23D;

    form{
        display: flex;
        flex-direction: column;
    }

    h1{
        font-family: "Poppins", sans-serif;
        font-size: 36px;
        font-weight: 500;
        line-height: 54px;
        text-align: left;
        color: #575757;

        p{
            font-weight: bold;
            font-weight: 700;
            font-size: 14px;
            line-height: 21px;
            color: #6a6a6a;
            text-align: left; 
        }
        margin-bottom: 50px;
    }
`

export const Label = styled.p`
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #8f8f8f;
`

export const Input = styled.input`
    width: 349px;
    height: 35px;
    border-radius: 5px;

    //SE tiver algun erro no props a borda recebe valores 'border: 2px solid #FF0000' SE NÃO ela recebe 'none'
    border: ${props => (props.error ? '2px solid #FF0000' : 'none')};

    box-shadow: 3px 3px 10px 0px #4A90E230;
    margin-bottom: ${props => (props.error ? '5px' : '15px')};
    padding-left: 10px;
    outline: none;
`

export const SignInLink = styled.p`
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #000000;
    margin-top: 15px;
    a{
        margin-left: 20px;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        color: #0091ff;
        cursor: pointer;
        &:hover{
        opacity: 0.8;
        }
        &:active{
            opacity: 0.6;
        }
        text-decoration: underline;
    }
`
