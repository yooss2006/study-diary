# 한입 크기로 잘라 먹는 리액트의 간단한 일기장 예제

해당 예제를 작성하며 새롭게 배운 내용과 마주했던 어려움에 대한 내용을 작성할 예정입니다.

<br>

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

<br>

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

<br>

3. select 사용하기

select 태그를 사용해본 적이 별로 없었다. option 태그를 감싸는 select 태그를 만들어 value 속성과 onChange 속성을 주면 된다.

<br>

4. useRef를 이용해 focus 주기

alert로 경고메시지를 주는 것은 디자인을 해칠 수 있다. 따라서 useRef를 이용해 focus를 주는 방법으로 경고를 알린다.

useRef는 다음과 같은 방식으로 사용하는데

```javascript
const authorInput = useRef();
```

authorInput는 DOM요소에 접근할 수 있는 기능을 할 수 있게 된다.

원하는 DOM 요소에 `ref={authorInput}` 속성을 넣어주고 어떠한 조건이 실행됐을 때 `authorInput.current.focus()`를 사용하면 해당 요소에 focus가 가게 할 수 있다.

`authorInput.current`는 해당 DOM요소 자체를 의미한다.

<br>

5. props로 undefined가 넘어오는 상황을 대비하자.

props로 배열이 넘어와야하는데 undefined가 넘어오는 경우가 있다. 이때 defaultProps를 이용해 기본 값을 설정하자.

```javascript
DiaryList.defaultProps = {
  diaryList: [],
};
```

<br>

6. props에 스프레드 연산자 사용하기

props에 스프레드 연산자를 사용해 한번에 데이터를 보낼 수 있다.

```javascript
<DiaryItem {...item} />
```

<br>

7. 함수형 컴포넌트에서의 lifecycle

useEffect라는 ReactHooks를 사용한다.

- 첫번째 매개변수론 콜백함수
- 두번째 매개변수론 의존성 배열이라는 배열이 들어간다. 이 배열안에 값이 변화하면 콜백 함수가 수행된다.

**마운트 시점**

의존성 배열이 빈 배열일 경우 컴포넌트가 마운트되는 시점 즉 만들어지는 시점에 한번 콜백함수가 수행된다.

```javascript
useEffect(() => {
  console.log("마운트");
}, []);
```

**업데이트 시점**

- 모든 state 변경에 업데이트하기

의존성 배열 없이 콜백함수만 배치한 경우 마운트 시점과 업데이트 즉 리렌더링 되는 시점에 콜백함수가 수행된다.

```javascript
useEffect(() => {
  console.log("업데이트");
});
```

- 특정 state 변경을 감지해 업데이트하기

의존성 배열안에 특정 state를 입력함으로써 마운트되는 시점과 해당 state가 변경되는 시점에만 콜백함수가 실행된다.

```javascript
useEffect(() => {
  console.log("특정 state 업데이트");
}, [state]);
```

**언마운트시점**

콜백함수안에 함수를 반환하면 언마운트 시점 즉 화면의 렌더링이 끝나는 시점에 반환한 함수가 실행된다.

```javascript
useEffect(() => {
  return () => {
    console.log("언마운트");
  };
}, []);
```

<br>

8. 단락평가 이용하기

리액트에서 단락평가를 이용하면 값이 true일 때
컴포넌트 랜더링과 같은 조건을 짧게 구현할 수 있다.

```javascript
{isVisible && <UnmountTest>}
```

위 경우 &&는 and 연산자이므로 앞의 요소가 false면 뒤의 요소는 볼것도 없이 false를 반환한다. 이러한 특성을 이용한 것이다.
