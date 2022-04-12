import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import { useState, useRef, useEffect, useMemo } from "react";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    const initData = res.slice(0, 20).map((item) => {
      return {
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    const newDiaryList = data.filter((item) => {
      if (item.id !== targetId) return item;
    });
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((item) => {
        if (item.id === targetId) return { ...item, content: newContent };
        else return item;
      })
    );
  };

  const getDiaryAnalysis = useMemo(() => {
    console.log("일기분석 시작"); //컴포넌트의 state가 바뀔때 마다 이 함수는 다시 실행되는데 이는 비효율적이다.
    const goodCount = data.filter((item) => item.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio }; //콜백함수가 리턴하는 값을 최적화하는 기능을 수행
  }, [data.length]); //data.length가 바뀔때마다 다시 연산함
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; //useMemo를 사용한 경우 더이상 함수가 아니게된다. 이유는 값을 리턴한 것 자체를 받는 것이기 때문이다.

  return (
    <div className="App">
      <header className="App-header"></header>
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
