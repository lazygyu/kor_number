# kor_number
한글 숫자를 정수로 변환합니다.

# 사용법
## 브라우저

```html
<script src="{path_to_js}/number-kor.js"></script>
<script>
  alert( Number.parseKor('천사') ); // 1004
</script>
```

## node.js

### 설치

```
npm install number-kor
```

### 사용

```javascript
const numberKor = require('number-kor');

const str = '천사';

if( numberKor.isOrdinal(str) ){
  console.log( numberKor.parseOrdinal(str) ); // 1004
}
```