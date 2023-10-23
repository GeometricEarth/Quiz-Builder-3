/* eslint-disable no-console */
import { createQuize } from "@/modules/QuizConverter";
import { EventBus } from "../plugins/EvenBus";
import store from "../store";
import JSZip from "jszip";
import mime from "mime/lite";

import parser from "./xmlparser";
import iconv from "iconv-lite";

EventBus.on("saveProject", saveProject);
// EventBus.on('printPDF', printPDF);

function saveProject(quizName) {
  let questions = store.getters.questions;
  // let quizName = store.getters.quizName;
  let zip = new JSZip();
  questions.forEach((questionData) => {
    questionData.imagePath = createImagePath(
      questionData.image,
      questionData.id,
      quizName
    );
    let fileName = questionData.imagePath.split("\\")[2];
    zip.file(fileName, dataURLtoBlob(questionData.image));
  });
  let xml = createQuize(questions, quizName);
  let fileNameXML = quizName + ".xml";
  xml = iconv.encode(xml, "win1251");
  zip.file(fileNameXML, xml);
  zip.generateAsync({ type: "blob" }).then((blob) => {
    let blobURL = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = quizName;
    link.href = blobURL;
    link.click();
  });
}
function saveXmlAsFile(quizData, quizName) {
  let xml = createQuize(quizData, quizName);
  const MIME_TYPE = "text/xml";
  let blob = new Blob([xml], { type: MIME_TYPE });
  let blobURL = window.URL.createObjectURL(blob);
  console.log(blobURL);
  const link = document.createElement("a");
  link.download = "quizes";
  link.href = blobURL;
  link.click();
}
function saveImageFromDataURL(imageData) {
  fetch(imageData)
    .then((res) => res.blob())
    .then((blob) => {
      let blobURL = window.URL.createObjectURL(blob);
      console.log(blobURL);
      const link = document.createElement("a");
      link.download = "image";
      link.href = blobURL;
      link.click();
    });
}
function dataURLtoBlob(url) {
  return fetch(url).then((res) => {
    return res.blob();
  });
}
function createImagePath(dataURL, id, quizName) {
  const MIME_TYPE = dataURL.split(",")[0].split(":")[1].split(";")[0];
  const extension = mime.getExtension(MIME_TYPE);
  console.log(MIME_TYPE);
  const imgName = "img" + id + "." + extension;
  const imgPath = `don\\${quizName}\\${imgName}`;
  return imgPath;
}
function readAsTextXML(file) {
  let reader = new FileReader();
  reader.onload = () => {
    const { questions, quizName } = parser.parseXML(reader.result);
    console.log(questions);
    questions.forEach((question) => {
      question.image = question.image.split("\\")[2];
      store.commit("ADD_QUESTION", question);
      store.commit("CHANGE_quizName", quizName);
    });
  };
  reader.readAsText(file, "windows-1251");
}
async function readAsDataURL(path) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(path);
  });
}
// function printPDF () {
//     function addScript(url) {
//         var script = document.createElement('script');
//         script.type = 'application/javascript';
//         script.src = url;
//         document.head.appendChild(script);
//         console.dir(document.head);
//     }
//     addScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');
//     var opt = {
//         margin:       1,
//         filename:     'myfile.pdf',
//         image:        { type: 'jpeg', quality: 0.98 },
//         html2canvas:  { scale: 2 },
//         jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
//       };

//     let element = document.getElementById('page');
//     console.dir(element);
//     // html2pdf().from(element).save();
//     html2pdf(element,opt);

//     // html2pdf;
//     // opt;
// }

export {
  saveProject,
  saveXmlAsFile,
  saveImageFromDataURL,
  createImagePath,
  dataURLtoBlob,
  readAsTextXML,
  readAsDataURL,
};
