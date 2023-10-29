import { Button, Header, Icon, Table } from "semantic-ui-react"
import styled from "styled-components"

const ScrollButton = styled.div`
    color: #dedede;
    font-size: 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const StyledResult = styled.div`
    /* height: 100vh; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 20pt;
    line-height: 2rem;
    span{
        color: blue;
    }
    .result{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100vh;
        img{
            width: 50vh;
        }
    }
`
export default function Result({onBackQuiz, length, questions, count, onQuizReset, sheet}){
    const results = questions?.map( (q, idx) => {
        return (
            <Table.Row warning={!sheet[idx]} positive={sheet[idx]} onClick={() => onBackQuiz(idx)}>
                <Table.Cell>{q.title}</Table.Cell>
                <Table.Cell>
                    답 : {q.options[q.answer]}
                </Table.Cell>
            </Table.Row>
        )
    })
    return (
        <StyledResult>
            <div></div>
            <div className="result">
                <img src='/illust.png'></img>
                <h2>퀴즈 종료</h2>
                <div style={{height: '1rem'}}/>
                <h5>나의 점수</h5>
            
                <div>
                    {count}/{length} 
                </div>
                <div style={{height: '3rem'}}/>
                <ScrollButton>
                    <b>내려서 문제 확인하기</b>
                    <Icon name="angle down"></Icon>
                </ScrollButton>
            </div>
            <Table celled>
                <Table.Body>
                {results}
                </Table.Body>
            </Table>
            <Button primary onClick={onQuizReset}>다시 풀어보기</Button>
        </StyledResult>
    )
}