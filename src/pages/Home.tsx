import React from 'react';
import Title from '../components/common/Title';
import Button from '../components/common/Button';
import InputText from '../components/common/InputText';

const Home = () => {
  return (
    <>
      <Title size="large">제목 테스트</Title>
      <Button size="large" scheme="primary">
        버튼 테스트
      </Button>
      <InputText placeholder="something here" />
      <div>home body</div>
    </>
  );
};

export default Home;
