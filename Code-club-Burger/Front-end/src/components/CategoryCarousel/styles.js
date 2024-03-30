import styled from 'styled-components'

export const Container = styled.div`
background: #efefef;
display: flex;
flex-direction: column;
align-items: center;
gap: 35px;
padding: 35px 0;

//Botões do carrocel

//estilo normal
.rec.rec-arrow{
    background-color: #9758a6;
    color: #efefef;
    box-shadow: 0px 4px 4px rgba(0,0,0, 0.25);
}

//quando o mouse esta em cima
.rec.rec-arrow:hover{
    border: 2px solid #9758a6;
    background-color: #efefef;
    color: #9758a6;
}

.rec.rec-arrow:disabled{
    border: none;
    background-color: #bebebf;
    color: #efefef;
}
`

export const CategoryImg = styled.img`
`
export const ContainerItens = styled.div`
display: flex;
flex-direction: column;
`

export const Image = styled.img`
width: 200px;
height: 200px;
border-radius: 10px;
`

export const Button = styled.button`
text-decoration: none;
display: flex;
align-items: center;
justify-content: center;

margin-top: 10px;
background: #9758a6;
border-radius: 8px;

height: 50px;
border: none;

font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 100%;
text-align: center;
color: #ffffff;

cursor: pointer;

&:hover{
    opacity: 0.7;
}
&:active{
    opacity: 0.3;
}
`
