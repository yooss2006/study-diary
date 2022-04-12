# 한입 크기로 잘라 먹는 리액트의 간단한 일기장 예제

해당 예제를 작성하며 새롭게 배운 내용과 마주했던 어려움에 대한 내용을 작성할 예정입니다.

자세한 내용은 노션에 정리했습니다.

[노션링크](https://supreme-balance-5ba.notion.site/a9a20d56e2894e13b6a15ac19f080fe0)

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

<br>

9. React Developer Tools

리액트 개발시 생산성을 높여주는 개발자 도구이며 크롬 웹 스토어에 해당 개발자도구를 설치하면 된다.

설치시 개발자모드로 들어가보면 리액트로 만들어진 웹페이지에선 components, profiler 라는 탭이 추가된다.

**components 탭**

- react로 개발중인 컴포넌트들의 계층 구조파악이 용이하다.
- 해당 컴포넌트들이 어떤 props, state 등을 가지고 있는지 파악할 수 있다.

톱니바퀴 모양을 클릭해 general의 `Highlight updates when components render.` 옵션을 선택해주자.

해당 옵션은 웹페이지의 어떠한 동작시 무슨 컴포넌트에서 리렌더링이 일어나는지 명시적으로 보여준다.

<br>

10. 컴포넌트 최적화 기법

**Memoization을 이용한 연산 최적화 기법 - useMemo**

이미 계산한 연산 결과를 기억해두었다가 동일한 연산시 기억한 데이터를 반환하는 방법

컴포넌트 안에 함수를 만들고 값을 반환한는 경우, state가 바뀌면 컴포넌트가 다시 렌더링되며 함수도 다시 불러오게 된다.

메모리적으로 낭비를 하게되므로 **useMemo** 사용이 필요하다.

```jsx
const getDiaryAnalysis = useMemo(() => {
  console.log("일기분석 시작");
  return { goodCount, badCount, goodRatio };
}, []);
```

기본 구조는 다음과 같다. useMemo는

- 첫번째 매개변수로 콜백함수
- 두번째 매개변수로 의존성 배열

이 들어간다.

**콜백함수**에서는 연산을 수행 후 값을 `return` 한다.

**의존성 배열** 안에 데이터를 넣으면 해당 데이터가 바뀔 때만 함수의 연산을 다시 수행한다.

useMemo를 사용한 경우 더이상 함수가 아니게된다. 따라서 뒤에 괄호를 붙이면 안된다.

```jsx
const { goodCount, badCount, goodRatio } = getDiaryAnalysis;
```

- 이유는 값을 리턴한 것 자체를 받는 것이기 때문이다

<br>

**컴포넌트 재사용 - react.memo**

부모 컴포넌트가 state의 변경으로 리렌더링되면 상관없는 자식 컴포넌트도 리렌더링되는데 이에 발생하는 낭비가 있다.

> 자식 컴포넌트에서 부모한테 받은 props가 변경될때만 리렌더링 되게 업데이트 조건을 걸 수 있다.

```jsx
//자식 컴포넌트
const 자식 = react.memo(({ props }) => {});
```

React.memo를 사용하면 부모 컴포넌트에서 state를 변경할 때 같은 state로 변경하는 경우도 캐치해 리렌더링을 방지할 수 있다.

예외적으로 객체는 같은 객체로 변경해도 리렌더링을 하는데 이는 얕은 비교를 하기 때문이다. 이를 막기위해선 **비교함수를** 따로 만들어준다.

비교함수에서 true를 반환하면 같은 객체, fasle를 반환하면 다른 객체로 판단한다.

```jsx
const 자식 = ({props})=>{
};
**const areEqual = (prevProps, nextProps) => {
	if(prevProps.count === nextProps.count)return true;
	return false
}
const MemoizedCounterB = React.memo(자식, areEqual);**
```

MemoizedCounterB를 부모 컴포넌트에서 불러서 사용하면 된다.

<br>

**useCallback**

자식 컴포넌트에서 부모 state를 변경하는 함수를 사용하는 경우 함수가 불필요하게 계속 만들어지는 사태가 발생한다.

useMemo와 다른 점은 useMemo는 함수가 아닌 값을 반환하는 것이고 useCallback은 값이 아닌 콜백함수를 반환하는 것이다.

```jsx
const onCreate = useCallback((author, content, emotion) => {
...
},[]);
```

마찬가지로 첫번째 매개변수로 콜백함수를 두번째 매개변수로 의존성 배열을 받는다.

의존성 배열안의 값이 변화되지 않으면 첫번째 값에 들어갔던 콜백함수를 계속 재사용한다.

```jsx
const onCreate = useCallback((author, content, emotion) => {
   ...
    setData((data)=>[newItem, ...data]);
  },[]);
```

state를 변화하는 함수에 함수를 넣는 것을 함수형 업데이트

의존성 배열을 비워도 최신의 state를 인자를 통해 참고해서 가능해진다.

<br>

자식 컴포넌트에서 부모 state를 변경하는 함수를 사용하는 경우 함수가 불필요하게 계속 만들어지는 사태가 발생한다.

useMemo와 다른 점은 useMemo는 함수가 아닌 값을 반환하는 것이고 useCallback은 값이 아닌 콜백함수를 반환하는 것이다.

```jsx
const onCreate = useCallback((author, content, emotion) => {
...
  },[]);
```

마찬가지로 첫번째 매개변수로 콜백함수를 두번째 매개변수로 의존성 배열을 받는다.

의존성 배열안의 값이 변화되지 않으면 첫번째 값에 들어갔던 콜백함수를 계속 재사용한다.

```jsx
const onCreate = useCallback((author, content, emotion) => {
   ...
    setData((data)=>[newItem, ...data]);
  },[]);
```

state를 변화하는 함수에 함수를 넣는 것을 함수형 업데이트

의존성 배열을 비워도 최신의 state를 인자를 통해 참고해서 가능해진다.

<br>

**useReducer**

복잡한 상태 로직을 컴포넌트로부터 분리하는 기능을 수행한다.

- 컴포넌트가 길어지는 것은 좋지 않아 이를 방지한다.

```jsx
const [count, dispatch] = useReducer(reducer, 1);
```

state(`count`)와 상태변화를 담당하는 action 발생 함수(`dispatch`)로 구성된다.

`useReducer`를 하려면 `reducer`라는 함수를 첫번째 매개변수로 넣어줘야한다. 이는 `dispatch`가 일으킨 상태변화를 처리해주는 역할을 한다.

두번째 매개변수는 count의 초기 값을 의미한다.

```jsx
onClick={()=>dispatch({type:10})}
```

`dispatch`를 호출하려면 `type`이라는 키가 들어간 객체를 전달해야한다. 이 객체를 `action` 객체라고 한다.

`dispatch`를 호출하면 `action` 객체는 `reducer` 함수로 넘어간다.

```jsx
const reducer = (state, action) => {
	switch (action.type) {
		case 1:
			return state + 1;
	...
		default:
			return state;
	}
}
```

`reducer` 함수는 최신의 state와 dispatch시 넘긴 action을 매개변수로 받는다.

해당 action에 해당하는 type의 case로 넘어가 반환한 값이 최신의 state가 되는 방식으로 작동한다.

이를 사용하면 useCallback과 병행시 의존성 배열을 걱정할 필요가 없다.

<br>

**context**

부모컴포넌트에서 자식컴포넌트로 props를 전달할 때 중간에 전달만 하는 컴포넌트가 존재하는데 이는 좋지 못하다. 이러한 현상을 **props drilling**이라고 한다.

props drilling을 해결하기 위해 만든 것이 **context**이다.

- 모든 데이터를 Provider라는 공급자 컴포넌트에게 전달한다.
- Provider는 자손의 컴포넌트에게 직통으로 데이터를 전달해준다. 이때 value라는 props로 전달하게 된다.

```jsx
context 생성
const MyContext = React.createContext(defaultValue);

데이터 공급
<MyContext.Provider value={전달하고자 하는 값}>
	{자식 컴포넌트들 위치}
</MyContext.Provider>
```

예시를 들어보면

1. context를 생성

- export한 이유는 다른 컴포넌트 파일에서 해당 context를 불러오기 위함

```jsx
export const DiaryStateContext = React.createContext();
```

1. 데이터 공급을 위해 컴포넌트들 감싸기

```jsx
<DiaryStateContext.Provider value={data}>
  <div className="App">
    <header className="App-header"></header>
    <DiaryEditor />
    <DiaryList />
  </div>
</DiaryStateContext.Provider>
```

1. context에서 정보를 꺼내오기

- export한 컴포넌트에서 import 해와야 한다.

```jsx
import { DiaryDispatchContext } from "./App";
const DiaryEditor = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
```

글생성, 글삭제, 글수정과 같은 기능을 value 값으로 data와 같이 전달하면 Provider도 컴포넌트이기에 불필요한 리렌더링이 발생하게 된다.

이때는 `context`를 하나 더 만들면 된다. 원하는 만큼 만들자.

팁은 위 세 함수를 하나로 묶는 과정에서 useMemo를 사용한다. 그 이유는 리렌더링이 발생했을 때 함수까지 새로 만들 필요는 없기 때문이다.

```jsx
export const DiaryDispatchContext = React.createContext();
...
const memoizedDispatches = useMemo(() => {
    return { onCreate, onEdit, onRemove };
  }, []);
...
<DiaryStateContext.Provider value={data}>
  <DiaryDispatchContext.Provider value={memoizedDispatches}>
  ...
  </DiaryDispatchContext.Provider>
</DiaryStateContext.Provider>
```
