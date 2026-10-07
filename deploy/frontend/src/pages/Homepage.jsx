import { useEffect, useState } from 'react';
import { NavLink } from 'react-router'; 
import { useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { CheckCircle2, Circle } from 'lucide-react';

function Homepage() {
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all' 
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/getAllProblem');
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/problemSolvedByUser');
        setSolvedProblems(data);
      } catch (error) {
        console.error('Error fetching solved problems:', error);
      }
    };

    fetchProblems();
    if (user) fetchSolvedProblems();
  }, [user]);

  const filteredProblems = problems.filter(problem => {
    const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
    const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
    const statusMatch = filters.status === 'all' || 
                      solvedProblems.some(sp => sp._id === problem._id);
    return difficultyMatch && tagMatch && statusMatch;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-emerald-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Area */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Problem Set</h1>
        <p className="text-gray-400">Master algorithms and data structures.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select 
          className="bg-[#151822] border border-white/5 rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={filters.status}
          onChange={(e) => setFilters({...filters, status: e.target.value})}
        >
          <option value="all">Status</option>
          <option value="solved">Solved</option>
        </select>

        <select 
          className="bg-[#151822] border border-white/5 rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={filters.difficulty}
          onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
        >
          <option value="all">Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select 
          className="bg-[#151822] border border-white/5 rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={filters.tag}
          onChange={(e) => setFilters({...filters, tag: e.target.value})}
        >
          <option value="all">Tags</option>
          <option value="array">Array</option>
          <option value="linkedList">Linked List</option>
          <option value="graph">Graph</option>
          <option value="dp">Dynamic Programming</option>
        </select>
      </div>

      {/* Problems Table */}
      <div className="bg-[#151822] rounded-xl border border-white/5 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 text-sm font-medium text-gray-400 bg-white/5">
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-7">Title</div>
          <div className="col-span-2">Tags</div>
          <div className="col-span-2 text-right">Difficulty</div>
        </div>
        
        <div className="divide-y divide-white/5">
          {filteredProblems.map(problem => {
            const isSolved = solvedProblems.some(sp => sp._id === problem._id);
            return (
              <div key={problem._id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-white/5 transition-colors">
                <div className="col-span-1 flex justify-center">
                  {isSolved ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div className="col-span-7 font-medium">
                  <NavLink to={`/problem/${problem._id}`} className="text-gray-200 hover:text-blue-400 transition-colors">
                    {problem.title}
                  </NavLink>
                </div>
                <div className="col-span-2">
                  <span className="px-2.5 py-1 bg-white/5 rounded-full text-xs text-gray-400 capitalize">
                    {problem.tags === 'linkedList' ? 'Linked List' : problem.tags}
                  </span>
                </div>
                <div className={`col-span-2 text-right text-sm font-medium capitalize ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </div>
              </div>
            );
          })}
          {filteredProblems.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500">
              No problems found matching your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;