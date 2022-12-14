### 스크립트 로딩 전략

1. HTML 본문 전체를 읽으면 DOMContentLoaded 이벤트 실행, 이 때에 스크립트를 로딩함
```
document.addEventListener('DOMContentLoaded', () => {
    ...
});
```

2. defer 특성은 &lt;script&gt; 태그를 마주쳐도 그 이후의 HTML 콘텐츠를 계속 불러오도록 지정
    - 스크립트와 HTML을 동시에 불러옴
```
<script src="script.js" defer></script>
```

3. 스크립트 요소를 본문의 맨 마지막에 배치 (&lt;/body&gt; 태그 바로 앞)
    - 모든 HTML을 읽은 후에 스크립트 로딩
    - HTML DOM을 모두 불러오기 전에는 스크립트의 로딩과 분석이 완전히 중단됨 > 성능 저하 가능성 있음

### async vs defer

1. async
    - 스크립트를 로딩하는 동안 페이지 로딩을 중단하지 않음
    - 스크립트 다운로드가 끝나면 바로 실행되며, 실행 도중에 페이지 렌더링이 중단됨
    - 스크립트의 실행 순서를 보장하지 않음
    - 다른 스크립트에 의존하지 않는 독립 스크립트에 사용
<br>
2. defer
    - 특성을 지정한 스크립트를 페이지 내에 배치한 순서대로 불러옴
    - 페이지 콘텐츠를 모두 불러오기 전까지는 실행하지 않음
    - 페이지 요소를 수정하거나 추가하는 등 DOM 작업을 기대하는 스크립트에 유용
