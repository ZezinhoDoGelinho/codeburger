import styled from 'styled-components'

export const Container = styled.div`
background-color: #ffffff;
box-shadow: 0px 10px 40px rgba(0,0,0,0 0.33);
border-radius: 20px;
padding: 10px;
width: max-content;
`
export const Header = styled.div`
display: grid;
grid-template-columns: repeat(6,1fr);
padding: 10px;
border-bottom: 1px solid #b5b5b5;
p{
    font-size: 16px;
    color: #b5b5b5;
}
`

export const Body = styled.div`
    display: grid;
    grid-template-columns: repeat(6,1fr);
    width: max-content;
    grid-gap: 10px 15px;
    padding: 10px;

    img{
        width: 120px;
        height: 120px;
        border-radius: 10px;
    }

    p{
        font-size: 16px;
        color: #000000;
    }

    .quantityContainer{
        display: flex;
        gap: 20px;
        button{
            height: 30px;
            background: transparent;
            border: none;
            font-size: 24px;
            cursor: pointer;
        }
        p{
            margin-top: 5px;
        }
    }
`
export const EmptyCart = styled.p`
padding: 20px;
text-align: center;
font-weight: bold;
`

export const TrashButton = styled.button`
display: grid;
justify-content: center;
border: none;
background: transparent;
cursor: pointer;
&:hover{
    opacity: 0.8;
}
&:active{
    opacity: 0.6;
}
img{
    width: 40px;
    height: 40px;
}
`
