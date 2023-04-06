var findSubstring = function(s, words) {
  const res = [];
  let need = new Map();
  for(let c of words) {
    need.set(c, need.has(c) ? need.get(c) + 1 : 1);
  }
  const wordLen = words[0].length;
  for(let i = 0; i < wordLen; i++) {
    const s2 = s.substring(i);
    let left = 0;
    let right = 0;
    let valid = 0;
    const wind = new Map();
    while (right < s2.length) {
      const c = s2.substring(right, right + wordLen);
      right += wordLen;
      if(need.has(c)) {
        wind.set(c, wind.has(c) ? wind.get(c) + 1 : 1);
        if(wind.get(c) === need.get(c)) {
          valid++;
        }
      }
      while (valid === need.size) {
        if(right - left === wordLen * words.length) {
          res.push(left + i);
        }
        const d = s2.substring(left, left + wordLen);
        left += wordLen;
        if(need.has(d)) {
          if(wind.get(d) == need.get(d)) {
            valid--;
          }
          wind.set(d, wind.get(d) - 1);
        }
      }
    }
  }

  return res;
};

findSubstring('barfoofoobarthefoobarman', ["bar","foo","the"]);