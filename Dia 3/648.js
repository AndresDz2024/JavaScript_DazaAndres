var replaceWords = function(dictionary, sentence) {
    sentence = sentence.split(" ");
    for(let x = 0; x < sentence.length;x++){
        for(let word of dictionary){
            if(word === sentence[x].slice(0, word.length)){
                sentence[x] = word
            }
        }
    }
    return sentence.join(" ")
};
