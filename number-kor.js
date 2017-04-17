(function () {
  const cardinal_numbers = [/^(영|공)/, /^(일|한|하나)/, /^(이|두|둘)/, /^(삼|세|셋)/, /^(사|네|넷)/, /^(오|다섯)/, /^(육|여섯)/, /^(칠|일곱)/, /^(팔|여덟)/, /^(구|아홉)/];
  const byten = {
    10: "열",
    20: "스물",
    30: "서른",
    40: "마흔",
    50: "쉰",
    60: "예순",
    70: "일흔",
    80: "여든",
    90: "아흔"
  };
  const small_digit_numbers = {
    10: "십",
    100: "백",
    1000: "천"
  };
  const big_digit_numbers = {
    10000: "만",
    100000000: "억",
    1000000000000: "조",
    10000000000000000: "경"
  };


  let parser = {
    isOrdinal: (str) => {
      try {
        this.parseOrdinal(str);
        return true;
      } catch (e) {
        return false;
      }
    },
    parseOrdinal: (_str) => {
      let sum = 0, tmpSum = 0, tmp = 0;
      let str = _str.replace(/^\s+|\s+$/g, '');
      if (str.length === 0) return null;
      loop1:
      while (str.length > 0) {
        for (let i in big_digit_numbers) {
          if (str.startsWith(big_digit_numbers[i])) {
            if (tmp != 0) tmpSum += tmp;
            if (tmpSum === 0) tmpSum = 1;
            tmpSum *= (i | 0);
            sum += tmpSum;
            tmpSum = 0; tmp = 0;
            str = str.substr(big_digit_numbers[i].length);
            continue loop1;
          }
        }
        for (let i in small_digit_numbers) {
          if (str.startsWith(small_digit_numbers[i])) {
            if (tmp === 0) tmp = 1;
            tmpSum += tmp * (i | 0);
            tmp = 0;
            str = str.substr(small_digit_numbers[i].length);
            continue loop1;
          }
        }
        for (let i in byten) {
          if (str.startsWith(byten[i])) {
            tmp += i | 0;
            str = str.substr(byten[i].length);
          }
        }
        let m = null;
        for (let i in cardinal_numbers) {
          if (m = str.match(cardinal_numbers[i])) {
            tmp += i | 0;
            str = str.substr(m[0].length);
            continue loop1;
          }
        }
        throw Error("알 수 없는 문자가 있습니다 : " + str[0]);
      }
      if (tmpSum) sum += tmpSum;
      if (tmp) sum += tmp;
      return sum;
    }
  }
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = parser;
  } else {
    Number.prototype.parseKor = parser.parseOrdinal;
  }
})();