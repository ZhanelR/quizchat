export const parseData = () => {
const allQuestions = {"response_code":0,"results":[{"category":"Entertainment: Video Games","type":"multiple","difficulty":"medium","question":"The original Planetside was released in North America on...","correct_answer":"May 20, 2003","incorrect_answers":["June 17, 2001","September 29, 2003","January 14, 2005"]},{"category":"General Knowledge","type":"multiple","difficulty":"medium","question":"The term &quot;scientist&quot; was coined in which year?","correct_answer":"1833","incorrect_answers":["1933","1942","1796"]},{"category":"Entertainment: Music","type":"multiple","difficulty":"medium","question":"Which one of these Pink Floyd albums were also a movie?","correct_answer":"The Wall","incorrect_answers":["The Dark Side of the Moon","Wish You Were Here","Animals"]},{"category":"Science: Computers","type":"multiple","difficulty":"hard","question":"Who is the original author of the realtime physics engine called PhysX?","correct_answer":"NovodeX","incorrect_answers":["Ageia","Nvidia","AMD"]},{"category":"Entertainment: Japanese Anime & Manga","type":"multiple","difficulty":"easy","question":"Who is the author of the manga series &quot;Astro Boy&quot;?","correct_answer":"Osamu Tezuka","incorrect_answers":["Mitsuteri Yokoyama","Takao Saito","Yoshihiro Tatsumi"]},{"category":"Geography","type":"multiple","difficulty":"easy","question":"What is Canada&#039;s smallest province?","correct_answer":"Prince Edward Island","incorrect_answers":["New Brunswick","Nova Scotia","Yukon"]},{"category":"Entertainment: Video Games","type":"boolean","difficulty":"easy","question":"In &quot;Undertale&quot;, the main character of the game is Sans.","correct_answer":"False","incorrect_answers":["True"]},{"category":"Geography","type":"multiple","difficulty":"medium","question":"What is the capital of Lithuania?","correct_answer":"Vilnius","incorrect_answers":["Tallinn","Helsinki","Riga"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"hard","question":"In the &quot;Pikmin&quot; games, which of the following pikmin colors lacks it&#039;s own &quot;Onion&quot; nest?","correct_answer":"Purple","incorrect_answers":["Winged","Blue","Rock"]},{"category":"Entertainment: Film","type":"multiple","difficulty":"medium","question":"Which of the following films was NOT directed by Quentin Tarantino?","correct_answer":"From Dusk till Dawn","incorrect_answers":["Jackie Brown","Pulp Fiction","Reservoir Dogs"]}]}

const ourQ = [];

allQuestions.results.forEach(item => {
    const newQuestion = {
        id: "",
        title: "",
        answers: []
}
newQuestion.id = item.question;
newQuestion.title = item.question;

//проход по неправ ответам, формирую прав объект  
item.incorrect_answers.forEach(answer => {
    const newAnswer = {
        id: "",
        title: "",
        isCorrect: false,
    }
    newAnswer.id = answer;
    newAnswer.title = answer;

    newQuestion.answers.push(newAnswer);

})

newQuestion.answers.push({
    id: item.correct_answer,
    title: item.correct_answer,
    isCorrect: true,
})
ourQ.push(newQuestion);
})  

return ourQ
}

