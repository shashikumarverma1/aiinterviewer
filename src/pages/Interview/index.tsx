import React, { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Brain, Mic, Send } from 'lucide-react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import { useGoogleAuth } from '@/hook/GoogleAuth';


const Interview = () => {
  const router = useRouter();
 
  const [questions, setQuestion] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];
  const [jobRole, setJobRole] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [showInterviewPannel, setShowInterviewPannel] = useState(false)

  const {user}=useGoogleAuth()
  
  console.log(user , "user21838336")
  console.log(user?.uid ,  user?.displayName  , user?.email , "22222222222222222222222")

  const handleQuetionGenetaion = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobRole, jobDescription }),
      });

      if (response.ok) {
        const data = await response.json();

        let cleanedData = data.question.replace(/```json/g, "").replace(/```/g, "").trim();
        let datas = JSON.parse(cleanedData)

        setQuestion(datas);
        setShowInterviewPannel(true)
      } else {
        console.error("Failed to fetch question.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

console.log(feedback , "feedback")
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (answer === '') alert("Please enter the answer")
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: currentQuestion,
        answer: answer,
        isLast:currentQuestionIndex  == questions?.length - 1 ,
        email:user?.email ,
        name:user?.displayName
      }),
    });
    if (response.ok && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setAnswer('');
    }
    if (response.ok && currentQuestionIndex == questions.length - 1) {
      router.push('/Dashbord')
    }
    const data = await response.json();
      
    setFeedback(data.feedback);
    setAnswer('');
  };

  const HandalNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    
    }
  }

  const toggleRecording = () => {
    // TODO: Implement voice recording
    setIsRecording(!isRecording);
  };

  return (
    <>
<Navbar/>
      {
        showInterviewPannel ?
          <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Interview Header */}
                <div className="bg-indigo-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Brain className="h-6 w-6 text-white" />
                      <h2 className="ml-2 text-xl font-semibold text-white">AI Interview Session</h2>
                    </div>
                    <span className="text-indigo-100">{jobRole}</span>
                  </div>
                </div>

                {/* Question Display */}
                <div className="px-6 py-8 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Current Question: {currentQuestionIndex + 1}</h3>
                  <p className="mt-2 text-gray-600">  {questions[currentQuestionIndex]?.question}</p>
                </div>

                {/* Answer Input */}
                <div className="px-6 py-4">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        rows={4}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Type your answer here..."
                      />
                      <div className="flex items-center justify-between">
                        <button
                         type="button"
                          onClick={() => {
                            HandalNextQuestion()

                          }}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          Next Question
                        </button>
                        <button
                          type="button"
                          onClick={toggleRecording}
                          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${isRecording
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                        >
                          <Mic className="h-4 w-4 mr-2" />
                          {isRecording ? 'Stop Recording' : 'Start Recording'}
                        </button>

                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Submit Answer
                        </button>
                      </div>
                    </div>
                  </form>

                </div>
                {feedback && (
                  <div className="px-6 py-4 bg-gray-100 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900">Feedback:</h3>
                    <p className="mt-2 text-gray-600">{feedback}</p>
                  </div>
                )}
              </div>
            </div>
          </div> :  <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-10 flex flex-center">
            <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <TextareaAutosize
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value.toUpperCase())}
                  minRows={1}
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-gray-700 transition-all"
                  placeholder="Type job role"
                />

                <TextareaAutosize
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  minRows={4}
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-gray-700 transition-all"
                  placeholder="Describe the role"
                />

                <div className="flex justify-end">
                  <button
                    onClick={handleQuetionGenetaion}
                    className="flex items-center px-5 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
      }
    </>
  );
};

export default Interview;
