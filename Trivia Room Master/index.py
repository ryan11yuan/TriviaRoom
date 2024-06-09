import openai
import PyPDF2
import json
import os

openai.api_key = os.environ.get("api")

questions_text = ""
pdf_path = "pdf.pdf"
pdf_file = open(pdf_path, 'rb')
pdf_reader = PyPDF2.PdfReader(pdf_file)
page_text = ""

for page_num in range(len(pdf_reader.pages)):
    text = pdf_reader.pages[page_num].extract_text().lower()
    page_text += text
    
completion = openai.chat.completions.create(
    model = "gpt-3.5-turbo", 
    messages=[
        {"role":"system", "content":"You are a quiz writer who makes quiz questions."},
        {"role":"user", "content":f"Create 10 4 option multiple choice quiz questions based on the following content, and add the corresponding letter of the answer in the line below the choices: {page_text}"}
    ]
)
questions = completion.choices[0].message.content
questions_text = questions

pdf_file.close()

questions_path = "questions.txt"
questions_file = open(questions_path, "w")
questions_file.write(questions_text)
questions_file.close()

questions_file = open(questions_path, "r")
index=1
json_list=[]
dict={}
a=""
b=""
c=""
d=""
for line in questions_file.readlines():
    if line != "\n":
        if index%6 == 1:
            dict["question"]=line[2:].strip()
        elif index%6 == 0:
            if line[8] == 'A':
                dict["correct_answer"]=a
                dict["incorrect_answers"]=[b,c,d]
            elif line[8] == 'B':
                dict["correct_answer"]=b
                dict["incorrect_answers"]=[a,c,d]
            elif line[8] == 'C':
                dict["correct_answer"]=c
                dict["incorrect_answers"]=[a,b,d]
            elif line[8] == 'D':
                dict["correct_answer"]=d
                dict["incorrect_answers"]=[a,b,c]
            json_list.append(dict)
            dict={}
        elif index%6 == 2:
            a=line[3:].strip()
        elif index%6 == 3:
            b=line[3:].strip()
        elif index%6 == 4:
            c=line[3:].strip()
        elif index%6 == 5:
            d=line[3:].strip()
        index+=1
        
data = {"results":json_list}
json_file = 'questions.json'
with open(json_file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)
    
questions_file.close()