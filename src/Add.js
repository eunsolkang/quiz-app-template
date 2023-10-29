import { ref, set } from "firebase/database";
import { useState } from "react"
import { Button, Form, Header, Message } from "semantic-ui-react"
import styled from "styled-components"
import { db } from "./firebase";
import { toast } from "react-toastify";
import {v4 as uuidv4} from 'uuid';
import { useLocation, useNavigate } from "react-router-dom";


const StyledAdd = styled.div`
    padding: 24px;
`
export default function Add() {
    const [title, setTitle] = useState();
    const [a, setA] = useState();
    const [b, setB] = useState();
    const [c, setC] = useState();
    const [d, setD] = useState();
    const [answer, setAnswer] = useState();
    const [description, setDescription] = useState();
    const navigate = useNavigate();
    const onClickAdd = () => {
        if(!title || title == ''){
            toast.warn('문제가 없습니다!')
            return;
        }

        if(!a || a === ''){
            toast.warn('1번 보기가 없습니다!');
            return;
        }

        if(!b || b === ''){
            toast.warn('2번 보기가 없습니다!');
            return;
        }

        if(!c || c === ''){
            toast.warn('3번 보기가 없습니다!');
            return;
        }

        if(!d || d === ''){
            toast.warn('4번 보기가 없습니다!');
            return;
        }

        if(!answer){
            toast.warn('정답이 없습니다');
            return;
        }

        if(!description || description === ''){
            toast.warn('문제 설명을 해주세요!');
            return;
        }

        try{
            const id = uuidv4();
            set(ref(db, `offer/${id}`), {
                title: title,
                options: [a, b, c, d],
                description: description,
                answer: answer,
              });
              toast.success('성공적으로 추가되었습니다');
              setTimeout(() => {
                navigate("/")
              }, 1500   )
        }catch(e){
            toast.error('오류발생');
        }
        
    }
    return (
        <StyledAdd>
            {/* <Header>문제 추가</Header> */}
            <Form>
                <Form.TextArea label="문제" onChange={(e) => setTitle(e.target.value)}  placeholder="문제를 입력해주세요"></Form.TextArea>

                <Form.Input onChange={(e) => setA(e.target.value)}  placeholder="1번 보기를 입력해주세요"></Form.Input>
                <Form.Input onChange={(e) => setB(e.target.value)}  placeholder="2번 보기를 입력해주세요"></Form.Input>
                <Form.Input onChange={(e) => setC(e.target.value)}  placeholder="3번 보기를 입력해주세요"></Form.Input>
                <Form.Input onChange={(e) => setD(e.target.value)}  placeholder="4번 보기를 입력해주세요"></Form.Input>

                <Form.Dropdown label="정답" options={[
                    {key:1, value: 0, text: '1번'},
                    {key:2, value: 1, text: '2번'},
                    {key:3, value: 2, text: '3번'},
                    {key:4, value: 3, text: '4번'}]}
                    fluid
                    placeholder="정답"
                    selection
                    onChange={(e, {name, value}) => setAnswer(value) }
                    >

                    </Form.Dropdown>

                <Form.TextArea label="설명" onChange={(e) => setDescription(e.target.value)}  placeholder="설명을 입력해주세요"></Form.TextArea>
            </Form>
            <div style={{height: "1rem"}}>

            </div>
            <Message warning>
                <Message.Header>
                    추가하시기 전에!
                </Message.Header>
                <Message.Content>
                    해당 문제는 Chat GPT 를 통해서 자동 검증 후 퀴즈에 추가됩니다!
                    퀴즈와 관련없는 내용은 추가가 불가능합니다!
                </Message.Content>
            </Message>
            <Button fluid primary onClick={() => onClickAdd()}>문제 추가하기</Button>
        </StyledAdd>
    )
}