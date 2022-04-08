# 한입 크기로 잘라 먹는 리액트의 간단한 일기장 예제

해당 예제를 작성하며 새롭게 배운 내용과 마주했던 어려움에 대한 내용을 작성할 예정입니다.

1. state 묶기

이전에는 비슷한 state더라도 각각의 state로 만들어서 관리했었다.

비슷한 역할을 하는 state를 묶어서 관리하는 것이 눈으로 보기에도 코드를 짜기에도 편하단 것을 알았다.

| 이전 코드

```javascript
let [author, setAuthor] = useState("");
let [content, setContent] = useState("");
```

| 묶은 코드

```javascript
const [state, setState] = useState({
  author: "",
  content: "",
});
```

2. 비슷한 이벤트 핸들러 합치기

벤트 핸들러의 함수를 합치는 것은 처음해봤는데 만약 내가 시도했다면 매개변수를 줘서 state 별로 수정하는 방법을 사용했을 것이다. 하지만 이 방법은 효율적이지 못하다.

강의에선 input과 textarea에 name을 state로 설정한 키 값으로 해서 `e.target.name`으로 꺼내쓰는 방법을 사용했는데 정말 좋은 방법인 것 같다.

```javascript
const handleChangeState = (e) => {
  setState({
    ...state,
    [e.target.name]: e.target.value,
  });
};
```

3. select 사용하기

select 태그를 사용해본 적이 별로 없었다. option 태그를 감싸는 select 태그를 만들어 value 속성과 onChange 속성을 주면 된다.
