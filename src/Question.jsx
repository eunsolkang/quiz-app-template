import './App.css';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Dropdown, Form, Header, Message, Progress, Select } from 'semantic-ui-react';
import { toast } from 'react-toastify';

const StyledBox = styled.div`
  padding: 2rem;
  .title{
    font-size: 20pt;
    word-break: keep-all;
    margin-bottom: 2rem;
    line-height: 2rem;
  }
  .index{
    font-size: 16pt;
    margin-bottom: 1rem;
    display: flex;
    justify-content:space-between ;

  }
`;

export default function Question({currentQuestion, questions, onQuizEnd, index, setIndex, sheet, setSheet}) {

  const [checked, setChecked] = useState(null);
  const [hideDesc, setHideDesc] = useState(true);
  const [done, setDone] = useState(false); 
  const [fail, setFail] = useState(false);
  const [count, setCount] = useState(0);
  const [chapter, setChapter] = useState(1);
  

  const handleChange = (idx) => {
    setChecked(idx);
  }

  useEffect(() => {
    setChapter(Math.floor(index / 10) + 1);
  }, [index])

  const onSubmitAnswer = (checked) => {
    if ( currentQuestion.answer !== checked ){
      setHideDesc(false);
      setFail(true);
      toast.error('오답입니다')
    }else{
      setSheet(sheet.map((s, i) => i === index ? true : false));
      setHideDesc(false);
      toast.success('정답입니다');
      setCount(count + 1);
    }
    setDone(true);
  }

  const onNextQuestion = () => {
    localStorage.setItem('question_index', Number(index+1));
    setHideDesc(true);
    setIndex(index + 1);
    setChecked(null);
    setDone(false);
    setFail(false);
  }

  const options = currentQuestion && currentQuestion.options.map( (o, idx) => {
    return (
      <Form.Radio
            key={`options_${idx}`}
            disabled={done}
            label={o}
            value='sm'
            checked={checked === idx}
            onChange={() => handleChange(idx)}
      />
    )
  });

  const handleDropChange = (e, {name, value}) => {
    setChapter(value);
    setIndex((value - 1) * 10);
    setHideDesc(true);
    setChecked(null);
    setDone(false);
    setFail(false);
  }
  const chapters = [
    { key: '1', value: 1, text: 'Chapter1' },
    { key: '2', value: 2, text: 'Chapter2' },
    { key: '3', value: 3, text: 'Chapter3' },
    { key: '4', value: 4, text: 'Chapter4' },
    { key: '5', value: 5, text: 'Chapter5' },
    { key: '6', value: 6, text: 'Chapter6' },
    { key: '7', value: 7, text: 'Chapter7' },
  ] 
  return (
    <StyledBox>
        
        <Progress active progress='ratio' value={index+1} total={questions.length} />
        <div style={{maxWidth: '100vw'}}>
        <Dropdown onChange={handleDropChange} value={chapter} defaultValue={1} options={chapters} />

        </div>
      <div className='title'>
        {currentQuestion.title}
      </div>
      <Form >
        {options}
      </Form>
      <div style={{height: '1rem'}}></div>
      {
        !hideDesc && (
          <Message warning={fail} success={!fail}>
            <Message.Header>
              답: {currentQuestion.options[currentQuestion.answer]}
            </Message.Header>
            {currentQuestion.description}
          </Message>
        )
      }
      <div>
        {!done && <Button disabled={checked == null} fluid primary onClick={() => onSubmitAnswer(checked)}>답안 제출</Button>}
        <div style={{height: '1rem'}}></div>
        {questions.length > index + 1 && <Button fluid disabled={!done} basic onClick={() => onNextQuestion()}>다음 문제</Button>}
      </div>
      <div>
        {questions.length == index + 1 && done &&  (
            <Button fluid onClick={() => onQuizEnd(count)} secondary>
                퀴즈 종료
            </Button>
        )}
      </div>
      
    </StyledBox>
  );
}