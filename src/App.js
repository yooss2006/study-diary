import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import { useState, useRef, useEffect } from "react";

//https://jsonplaceholder.typicode.com/comments

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

  return (
    <div className="App">
      <header className="App-header"></header>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
