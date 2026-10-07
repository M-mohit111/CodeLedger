import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useParams, NavLink } from 'react-router';
import axiosClient from "../utils/axiosClient"
import SubmissionHistory from "../components/SubmissionHistory"
import ChatAi from '../components/ChatAi';
import Editorial from '../components/Editorial';
import { Code2, Settings, Play, Send, Trophy } from 'lucide-react';

const langMap = {
  cpp: 'C++',
  java: 'Java',
  javascript: 'JavaScript'
};

const ProblemPage = () => {
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeRightTab, setActiveRightTab] = useState('code'); // code, testcase, result
  const [leftSubTab, setLeftSubTab] = useState('description'); // description, hints, discussion
  const editorRef = useRef(null);
  let { problemId } = useParams();

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/problem/problemById/${problemId}`);
        const initialCode = response.data.startCode.find(sc => sc.language === langMap[selectedLanguage])?.initialCode || '';
        setProblem(response.data);
        setCode(initialCode);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching problem:', error);
        setLoading(false);
      }
    };
    fetchProblem();
  }, [problemId, selectedLanguage]);

  useEffect(() => {
    if (problem) {
      const initialCode = problem.startCode.find(sc => sc.language === langMap[selectedLanguage])?.initialCode || '';
      setCode(initialCode);
    }
  }, [selectedLanguage, problem]);

  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleRun = async () => {
    setLoading(true);
    setRunResult(null);
    setActiveRightTab('testcase');
    try {
      const response = await axiosClient.post(`/submission/run/${problemId}`, {
        code,
        language: selectedLanguage
      });
      setRunResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error running code:', error);
      setRunResult({ success: false, error: 'Internal server error' });
      setLoading(false);
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    setSubmitResult(null);
    setActiveRightTab('result');
    try {
      const response = await axiosClient.post(`/submission/submit/${problemId}`, {
        code: code,
        language: selectedLanguage
      });
      setSubmitResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error submitting code:', error);
      setSubmitResult(null);
      setLoading(false);
    }
  };

  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case 'javascript': return 'javascript';
      case 'java': return 'java';
      case 'cpp': return 'cpp';
      default: return 'javascript';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-emerald-400 bg-emerald-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'hard': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  if (loading && !problem) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0b0d14]">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#0b0d14] text-gray-300 font-sans overflow-hidden">
      
      {/* Navbar exactly like Image 1 */}
      <header className="h-14 flex items-center justify-between px-4 bg-[#0b0d14] border-b border-white/5 shrink-0">
        <div className="flex items-center gap-8 h-full">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Code2 className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold text-white">Code<span className="text-blue-500">Ledger</span></span>
          </NavLink>

          {/* Top Tabs */}
          <nav className="flex items-center h-full gap-1">
            {['description', 'editorial', 'submissions', 'solutions', 'chatAI'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveLeftTab(tab)}
                className={`h-full px-4 text-sm font-medium capitalize transition-colors relative flex items-center ${
                  activeLeftTab === tab ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab === 'chatAI' ? 'Chat/AI' : tab}
                {activeLeftTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_-2px_10px_rgba(59,130,246,0.5)]"></div>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#151822] rounded-lg p-1 border border-white/5">
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="bg-transparent text-sm text-gray-300 outline-none px-2 cursor-pointer"
            >
              <option value="cpp" className="bg-[#151822]">C++</option>
              <option value="java" className="bg-[#151822]">Java</option>
              <option value="javascript" className="bg-[#151822]">JavaScript</option>
            </select>
          </div>
          <button 
            onClick={handleRun}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors"
          >
            {loading && activeRightTab === 'testcase' ? <span className="loading loading-spinner loading-xs"></span> : <Play className="w-4 h-4" />} Run
          </button>
          <button 
            onClick={handleSubmitCode}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/20 transition-colors"
          >
            {loading && activeRightTab === 'result' ? <span className="loading loading-spinner loading-xs"></span> : <Send className="w-4 h-4" />} Submit
          </button>
        </div>
      </header>

      {/* Main Workspace Workspace Grid */}
      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        
        {/* Left Panel */}
        <div className="w-1/2 flex flex-col bg-[#151822] rounded-xl border border-white/5 overflow-hidden">
          {problem && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {activeLeftTab === 'description' && (
                <>
                  {/* Title & Difficulty */}
                  <div className="px-6 pt-6 pb-2">
                    <div className="flex items-center gap-4 mb-4">
                      <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
                      <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                      </div>
                    </div>
                    {/* Inner Subtabs */}
                    <div className="flex gap-6 border-b border-white/5 pb-2">
                      {['description', 'hints', 'discussion'].map(sub => (
                        <button
                          key={sub}
                          onClick={() => setLeftSubTab(sub)}
                          className={`text-sm font-medium capitalize transition-colors ${
                            leftSubTab === sub ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Content Area */}
                  <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
                    {leftSubTab === 'description' && (
                      <div className="space-y-6">
                        <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">
                          {problem.description}
                        </div>
                        
                        <div className="space-y-4">
                          {problem.visibleTestCases.map((example, index) => (
                            <div key={index} className="space-y-2">
                              <h3 className="font-bold text-white text-sm">Example {index + 1}:</h3>
                              <div className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-sm space-y-1">
                                <div><span className="text-gray-500">Input:</span> <span className="text-gray-200">{example.input}</span></div>
                                <div><span className="text-gray-500">Output:</span> <span className="text-gray-200">{example.output}</span></div>
                                {example.explanation && (
                                  <div><span className="text-gray-500">Explanation:</span> <span className="text-gray-200">{example.explanation}</span></div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {leftSubTab === 'hints' && <div className="text-gray-500 italic text-sm">No hints available for this problem.</div>}
                    {leftSubTab === 'discussion' && <div className="text-gray-500 italic text-sm">Discussions coming soon.</div>}
                  </div>
                </>
              )}

              {activeLeftTab === 'editorial' && (
                <div className="flex-1 overflow-y-auto p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Editorial</h2>
                  <Editorial secureUrl={problem.secureUrl} thumbnailUrl={problem.thumbnailUrl} duration={problem.duration}/>
                </div>
              )}

              {activeLeftTab === 'solutions' && (
                <div className="flex-1 overflow-y-auto p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Solutions</h2>
                  <div className="space-y-6">
                    {problem.referenceSolution && problem.referenceSolution.length > 0 ? (
                      problem.referenceSolution.map((solution, index) => (
                        <div key={index} className="rounded-xl border border-white/10 overflow-hidden">
                          <div className="bg-white/5 px-4 py-2 border-b border-white/10">
                            <h3 className="text-sm font-medium text-gray-300">{problem?.title} - {solution?.language}</h3>
                          </div>
                          <pre className="p-4 text-sm font-mono text-gray-300 bg-[#0b0d14] overflow-x-auto">
                            <code>{solution?.completeCode}</code>
                          </pre>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">Solutions will be available after you solve the problem or are not provided.</p>
                    )}
                  </div>
                </div>
              )}

              {activeLeftTab === 'submissions' && (
                <div className="flex-1 overflow-y-auto p-6">
                  <h2 className="text-xl font-bold text-white mb-4">My Submissions</h2>
                  <SubmissionHistory problemId={problemId} />
                </div>
              )}

              {activeLeftTab === 'chatAI' && (
                <div className="flex-1 flex flex-col p-6 overflow-hidden">
                  <h2 className="text-xl font-bold text-white mb-4 shrink-0">AI Doubt Solver</h2>
                  <div className="flex-1 overflow-y-auto">
                    <ChatAi problem={problem}></ChatAi>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="w-1/2 flex flex-col bg-[#151822] rounded-xl border border-white/5 overflow-hidden">
          
          {/* File Tab Header (Mocking the IDE look) */}
          <div className="flex bg-[#0b0d14] border-b border-white/5 shrink-0">
            <div className="px-4 py-2 bg-[#151822] border-r border-white/5 flex items-center gap-2 border-t-2 border-t-blue-500">
              <Code2 className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-gray-200">main.{selectedLanguage === 'javascript' ? 'js' : selectedLanguage === 'cpp' ? 'cpp' : 'java'}</span>
              <span className="text-gray-500 text-xs ml-2 cursor-pointer hover:text-white">×</span>
            </div>
          </div>

          {/* Code/Testcase/Result Area */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            
            {activeRightTab === 'code' && (
              <div className="flex-1 py-4">
                <Editor
                  height="100%"
                  language={getLanguageForMonaco(selectedLanguage)}
                  value={code}
                  onChange={handleEditorChange}
                  onMount={handleEditorDidMount}
                  theme="vs-dark"
                  options={{
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 4,
                    wordWrap: 'on',
                    padding: { top: 16 },
                  }}
                />
              </div>
            )}

            {activeRightTab === 'testcase' && (
              <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white">Test Results</h3>
                  <button onClick={() => setActiveRightTab('code')} className="text-xs text-blue-400 hover:underline">Back to Code</button>
                </div>
                {runResult ? (
                  <div className={`p-4 rounded-xl border ${runResult.success ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                    {runResult.success ? (
                      <div>
                        <h4 className="font-bold text-green-400">✅ All test cases passed!</h4>
                        <div className="text-xs text-gray-400 mt-1 space-x-4">
                          <span>Runtime: {runResult.runtime}s</span>
                          <span>Memory: {runResult.memory}KB</span>
                        </div>
                        <div className="mt-6 space-y-4">
                          {runResult.testCases.map((tc, i) => (
                            <div key={i} className="bg-[#0b0d14] p-4 rounded-lg border border-white/5 text-sm space-y-2">
                              <div><strong className="text-gray-500">Input:</strong> <span className="text-gray-300 font-mono">{tc.stdin}</span></div>
                              <div><strong className="text-gray-500">Expected:</strong> <span className="text-gray-300 font-mono">{tc.expected_output}</span></div>
                              <div><strong className="text-gray-500">Output:</strong> <span className="text-gray-300 font-mono">{tc.stdout}</span></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-bold text-red-400">❌ Error / Failed Testcase</h4>
                        <div className="mt-6 space-y-4">
                          {runResult.testCases?.map((tc, i) => (
                            <div key={i} className={`bg-[#0b0d14] p-4 rounded-lg border ${tc.status_id === 3 ? 'border-green-500/20' : 'border-red-500/20'} text-sm space-y-2`}>
                              <div><strong className="text-gray-500">Input:</strong> <span className="text-gray-300 font-mono">{tc.stdin}</span></div>
                              <div><strong className="text-gray-500">Expected:</strong> <span className="text-gray-300 font-mono">{tc.expected_output}</span></div>
                              <div><strong className="text-gray-500">Output:</strong> <span className="text-gray-300 font-mono">{tc.stdout}</span></div>
                              <div className={`mt-2 font-bold ${tc.status_id === 3 ? 'text-green-400' : 'text-red-400'}`}>
                                {tc.status_id === 3 ? '✓ Passed' : '✗ Failed'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <Play className="w-12 h-12 opacity-20 mb-4" />
                    <p>Click "Run" to execute your code against test cases.</p>
                  </div>
                )}
              </div>
            )}

            {activeRightTab === 'result' && (
              <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white">Submission Status</h3>
                  <button onClick={() => setActiveRightTab('code')} className="text-xs text-blue-400 hover:underline">Back to Code</button>
                </div>
                {submitResult ? (
                  <div className={`p-6 rounded-xl border ${submitResult.accepted ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                    {submitResult.accepted ? (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Trophy className="w-8 h-8 text-green-400" />
                        </div>
                        <h4 className="text-2xl font-bold text-green-400 mb-2">Accepted!</h4>
                        <p className="text-gray-400 mb-6">You successfully solved this problem.</p>
                        <div className="flex justify-center gap-8 text-sm">
                          <div>
                            <div className="text-gray-500 mb-1">Passed</div>
                            <div className="font-bold text-white text-lg">{submitResult.passedTestCases}/{submitResult.totalTestCases}</div>
                          </div>
                          <div>
                            <div className="text-gray-500 mb-1">Runtime</div>
                            <div className="font-bold text-white text-lg">{submitResult.runtime}s</div>
                          </div>
                          <div>
                            <div className="text-gray-500 mb-1">Memory</div>
                            <div className="font-bold text-white text-lg">{submitResult.memory}KB</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Settings className="w-8 h-8 text-red-400" />
                        </div>
                        <h4 className="text-2xl font-bold text-red-400 mb-2">{submitResult.error || 'Submission Failed'}</h4>
                        <div className="mt-4 text-gray-300">
                          Test Cases Passed: {submitResult.passedTestCases}/{submitResult.totalTestCases}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <Send className="w-12 h-12 opacity-20 mb-4" />
                    <p>Click "Submit" to evaluate your solution.</p>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Status Bar */}
            <div className="h-8 shrink-0 bg-[#0b0d14] border-t border-white/5 flex items-center justify-between px-4 text-xs text-gray-500">
              <div className="flex gap-4">
                <span>Ln 1, Col 1</span> {/* In a real app, bind this to editor cursor state */}
              </div>
              <div className="flex items-center gap-4">
                <span>{langMap[selectedLanguage]}</span>
              </div>
            </div>
            
          </div>
        </div>

      </div>

      {/* Global CSS for custom scrollbar hidden in normal views but active on hover or applied to .custom-scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
};

export default ProblemPage;