import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  const dummyList = [
    {
      id: 1,
      author: "유순상",
      content: "하이",
      emotion: "5",
      created_date: new Date().getTime(),
    },
    {
      id: 2,
      author: "유순상1",
      content: "하이c",
      emotion: "1",
      created_date: new Date().getTime(),
    },
    {
      id: 3,
      author: "유순상2",
      content: "하이f",
      emotion: "3",
      created_date: new Date().getTime(),
    },
  ];
  return (
    <div className="App">
      <header className="App-header"></header>
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
