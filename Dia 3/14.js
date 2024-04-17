var longestCommonPrefix = function(strs) {
    if (strs.length === 0) {
        return '';
    }
    let sen = strs[0];
    for (let x = 1; x < strs.length; x++) {
        while (strs[x].indexOf(sen) !== 0) {
            sen = sen.substring(0, sen.length - 1);
            if (sen === '') {
                return '';
            }
        }
    }
    return sen;
};
