import React, { useEffect, useState, useRef } from "react";
import { isLineAnswer, isLineQuestion } from "../../Utility/QuestionParser";
import "./CustomTextarea.css";

export const CustomTextarea = () => {
  const [lines, setLines] = useState([""]);
  const [linesWithTags, setLinesWithTags] = useState<[string, string][]>([]);
  const [lastQuestionId, setLastQuestionId] = useState(0);

  // function handleInput(event: any) {
  //   //buffer the input event to prevent too many re-renders
  //   const currentTime = new Date().getTime();
  //   if (currentTime - lastInputTime < 100) {
  //     return;
  //   }
  //   setLastInputTime(currentTime);

  //   let text = event.currentTarget.innerHTML;
  //   //replace all <br> with \n
  //   text = text.replace(/<div>/g, "\n");
  //   //remove all html tags
  //   text = text.replace(/<[^>]*>/g, "");
  //   //remove %nbsp; from the text
  //   text = text.replace(/&nbsp;/g, " ");

  //   //split the text into lines
  //   const lines = text.split("\n");

  //   setLines(lines);
  // }

  const handleInput = (event: any) => {
    console.log(event.currentTarget.innerHTML);
    //get id of the current div
    const id = event.currentTarget.id;
    console.log(id);
  };

  const handleKeyDown = (e: any) => {
    if (e.code === "Space") {
      //if the space key is pressed, then check if the text is a question
      const text = e.target.innerText;
      if (isLineQuestion(text)) {
        //insert a div before the current div and focus on it with the class name "question"
        const div = createDiv("question");
        e.target.before(div);
        div.focus();
        //reset the text of the current div
        e.target.innerText = "";
      } else if (isLineAnswer(text)) {
        //insert a div before the current div and focus on it with the class name "answer"
        const div = createDiv("answer");
        e.target.before(div);
        div.focus();
        //reset the text of the current div
        e.target.innerText = "";
      }
    }
  };

  const createDiv = (className: string) => {
    const div = document.createElement("div");
    div.className = className;
    div.style.minHeight = "30px";
    div.contentEditable = "true";
    div.oninput = handleInput;
    div.id = className + "-" + lastQuestionId;
    if (className === "answer") {
      setLastQuestionId(lastQuestionId + 1);
    }
    return div;
  };

  useEffect(() => {
    //if the length of the lines array has changed, then we need to update the linesWithTags array
    //create a new array of lines with tags
    const newLinesWithTags = lines.map((line) => {
      //if the line is a question line, then add the question tag
      if (isLineQuestion(line)) {
        return [line, "question"];
      } else if (isLineAnswer(line)) {
        return [line, "answer"];
      }
      //if the line is not a question line, then add the answer tag
      return [line, "default"];
    });
    setLinesWithTags(newLinesWithTags as [string, string][]);
  }, [lines]);

  return (
    <>
      <div
        className="CustomInput min-h-[30px] border"
        contentEditable={true}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      ></div>
      {linesWithTags.map((lineWithTags, index) => (
        <div key={index}>
          {lineWithTags[1] === "question" ? (
            <span className="text-red-500">{lineWithTags[0]}</span>
          ) : lineWithTags[1] === "answer" ? (
            <span className="text-green-500">{lineWithTags[0]}</span>
          ) : (
            <span>{lineWithTags[0]}</span>
          )}
        </div>
      ))}
    </>
  );
};
