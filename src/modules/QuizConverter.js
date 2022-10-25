import builder from "xmlbuilder";

function createQuize(questions, quizName) {
    let obj = builder
        .create("root", { version: "1.0", encoding: "windows-1251" })
        .ele("questions")
        .ele("group", { name: "Group0" });

    for (let i = 0; i < questions.length; i++) {
        obj.ele('question',
            {
                'answer': questions[i].trueAnswer+1,
                'name': 'Question' + questions[i].id,
                'timeout': questions[i].timeout || 20,
            })
            .ele('text', questions[i].questionText).up()
            .ele('picture', questions[i].imagePath).up()
            .ele('answer', questions[i].answers[0]).up()
            .ele('answer', questions[i].answers[1]).up()
            .ele('answer', questions[i].answers[2]).up()
            .ele('answer', questions[i].answers[3]).up();
    }

    obj
        .up()
        .up()
        .ele("quizes")
        .ele("quiz", { name: quizName, tossAnswers: "true" })
        .ele(cunk());
    function cunk() {
        var ar = [];
        for (var i = 0; i < questions.length; i++) {
            ar.push({
                question: {
                    "@groupName": "Group0",
                    "@questionName": "Question" + (i)
                }
            });
        }
        return ar;
    }

    return obj.end({ pretty: true });
}

export { createQuize }
