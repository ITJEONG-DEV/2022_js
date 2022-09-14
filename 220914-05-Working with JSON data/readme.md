### JSON
- Douglas Crockford가 널리 퍼뜨린 Javascript 객체 문법을 따르는 문자 기반의 데이터 포맷
- Javascript 객체 문법과 매우 유사하지만 js가 아니더라도 JSON을 읽고 쓸 수 있음
- 문자열 형태로 존재하여 네트워크를 통해 전송할 때 유용함
- `.json` 확장자를 가진 단순 텍스트 파일에 저장할 수 있음
<br>

### JSON 구조
- js의 객체 리터럴 문법을 따르는 문자열
- js의 기본 데이터 타입인 문자열, 숫자, 배열, 불리언 그리고 다른 객체를 포함할 수 있음
```
{
  "squadName": "Super hero squad",
  "homeTown": "Metro City",
  "formed": 2016,
  "secretBase": "Super tower",
  "active": true,
  "members": [
    {
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers": [
        "Radiation resistance",
        "Turning tiny",
        "Radiation blast"
      ]
    },
    {
      "name": "Madame Uppercut",
      "age": 39,
      "secretIdentity": "Jane Wilson",
      "powers": [
        "Million tonne punch",
        "Damage resistance",
        "Superhuman reflexes"
      ]
    },
    {
      "name": "Eternal Flame",
      "age": 1000000,
      "secretIdentity": "Unknown",
      "powers": [
        "Immortality",
        "Heat Immunity",
        "Inferno",
        "Teleportation",
        "Interdimensional travel"
      ]
    }
  ]
}
```

- 상기 객체를 js에서 로드하고, `superHeroes`라는 변수에 파싱하면 다음과 같이 객체 내의 데이터에 접근할 수 있음
```
superHeroes.homeTown
Superhuman['active']
```

- 하위 계층의 데이터에 접근하려면, 간단하게 프로퍼티 이름과 배열 인덱스의 체인을 통해 접근할 수 있음
- superHeroes의 두 번째 member의 세 번째 power에 접근할 경우
```
superHeroes['memebers'][1]['powers'][2]
```
<br>

### JSON에서의 배열
- js의 배열 또한 JSON에서 유효함
```
[
  {
    "name": "Molecule Man",
    "age": 29,
    "secretIdentity": "Dan Jukes",
    "powers": [
      "Radiation resistance",
      "Turning tiny",
      "Radiation blast"
    ]
  },
  {
    "name": "Madame Uppercut",
    "age": 39,
    "secretIdentity": "Jane Wilson",
    "powers": [
      "Million tonne punch",
      "Damage resistance",
      "Superhuman reflexes"
    ]
  }
]
```
- 배열의 요소에 접근하기 위해서는 `[0]["powers"][0]`과 같이 배열의 인덱스를 사용하면 됨
<br>

### Other notes
- JSON은 데이터 포맷으로, 프로퍼티만 담을 수 있음 (메서드x)
- 문자열과 프로퍼티의 이름 작성 시 큰 따옴표만을 사용해야 함 (작은따옴표 사용 불가능)
- 콤마나 콜론을 잘못 배치하는 실수로 JSON 파일이 잘못되어 작동하지 않을 수 있음 (JSON 유효성 검사)
- JSON 내부에 포함할 수 있는 모든 형태의 데이터 타입을 취할 수 있음