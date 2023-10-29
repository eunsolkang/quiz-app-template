import { Link } from "react-router-dom"
import { Button, Header } from "semantic-ui-react"
import styled from "styled-components"

const StyledHome = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 24px;
    img{
        width: 50vh;
    }
    h1{
        color: #6c63ff;
        font-weight: bold;
        font-size: 28pt;
    }
`
export default function Home () {
    return (
        <StyledHome>
            <h1>세계사 퀴즈</h1>
            <img src='/quiz.png'></img>
            
            <Link style={{width: '100%'}} to={`/quiz`}><Button primary fluid>퀴즈 풀어보기</Button></Link>
            <div style={{height: '1rem'}}></div>
            <Link  style={{width: '100%'}} to={`/add`}><Button basic primary fluid>문제 추가하기</Button></Link>
        </StyledHome>
    )
}