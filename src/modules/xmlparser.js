/* eslint-disable no-console */
// const iconv = require('iconv-lite');
import XmlParser from 'xml2js-parser'
// const parseString = require('xml2js-parser').parseString;
class ParseXmlToQuiz {
    constructor() {

    }
    parseXML(xml) {
        // TODO: Реализовать проверку кодировки и приведение к utf8
        // TODO: Реализовать замену адреса картинки на относительные от папки xml
        // Добавить предупреждение при отсусутсвии картинок и возможность вручную указать папку

        // xml = iconv.encode(iconv.decode(xml, 'win1251'), 'utf8');
        let parser = new XmlParser()
        try {
            const result = parser.parseStringSync(xml);
            let json = result.root.questions[0].group[0].question;
            let quizName = result.root.quizes["0"].quiz["0"].$.name;
            let id = 0;
            let questions = json.map((question) => {
                let newQestion = {};
                newQestion.trueAnswer = question.$.answer-1;
                newQestion.timeout = question.$.timeout;
                newQestion.image = question.picture[0];
                newQestion.questionText = question.text[0];
                newQestion.answers = question.answer;
                newQestion.id = id+1;
                return newQestion
            })
            return {questions, quizName};
        } catch (err) {
            console.error(err);
        }
    }
}
export default new ParseXmlToQuiz;

