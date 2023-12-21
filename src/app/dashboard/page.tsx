"use client"

import React, { useState } from 'react';

interface Doubt {
  id: number;
  title: string;
  description: string;
  tags: string[];
  date: string;
  upvotes: number;
  downvotes: number;
  upvotedBy: number[];
  downvotedBy: number[];
}

const DoubtBox: React.FC = () => {
  const [doubts, setDoubts] = useState<Doubt[]>([
    { id: 1, title: 'Setting up MongoDB Connection', description: "I'm having trouble configuring and establishing a connection to MongoDB in my MERN stack project. ", tags: ['MongoDB', 'MERN', 'Database'], date: '2023-01-01', upvotes: 2, downvotes: 0, upvotedBy: [], downvotedBy: [] },
    { id: 2, title: "React Component Lifecycle Methods Explanation", description: "I'm confused about the lifecycle methods in React components. Can someone provide a clear explanation?", tags: ['React', 'Lifecycle Methods', 'Component'], date: '2023-01-02', upvotes: 9, downvotes: 0, upvotedBy: [], downvotedBy: [] },
    { id: 3, title: "Node.js Express Routing Issue", description: "I'm facing difficulties in setting up routes using Express in my Node.js application.?", tags: ['Node.js', 'Express', 'Routing'], date: '2023-01-02', upvotes: 12, downvotes: 0, upvotedBy: [], downvotedBy: [] },
    { id: 4, title: 'Setting up MongoDB Connection', description: "I'm having trouble configuring and establishing a connection to MongoDB in my MERN stack project. ", tags: ['MongoDB', 'MERN', 'Database'], date: '2023-01-01', upvotes: 1, downvotes: 0, upvotedBy: [], downvotedBy: [] },
  ]);

  const [currentDoubt, setCurrentDoubt] = useState({
    title: '',
    description: '',
    tags: '',
  });

  const handlePostDoubt = () => {
    const newDoubt: Doubt = {
      id: doubts.length + 1,
      title: currentDoubt.title,
      description: currentDoubt.description,
      tags: currentDoubt.tags.split(',').map((tag) => tag.trim()),
      date: new Date().toLocaleString(),
      upvotes: 0,
      downvotes: 0,
      upvotedBy: [],
      downvotedBy: [],
    };

    setDoubts((prevDoubts) => [...prevDoubts, newDoubt]);

    setCurrentDoubt({ title: '', description: '', tags: '' });
  };

  const handleVote = (doubtId: number, type: 'upvote' | 'downvote') => {
    setDoubts((prevDoubts) =>
      prevDoubts.map((doubt) => {
        if (doubt.id === doubtId) {
          if (type === 'upvote') {
            // Toggle upvote
            const upvoted = doubt.upvotedBy.includes(1);
            return {
              ...doubt,
              upvotes: upvoted ? doubt.upvotes - 1 : doubt.upvotes + 1,
              upvotedBy: upvoted ? doubt.upvotedBy.filter((user) => user !== 1) : [...doubt.upvotedBy, 1],
            };
          } else if (type === 'downvote') {
            // Toggle downvote
            const downvoted = doubt.downvotedBy.includes(1);
            return {
              ...doubt,
              downvotes: downvoted ? doubt.downvotes - 1 : doubt.downvotes + 1,
              downvotedBy: downvoted ? doubt.downvotedBy.filter((user) => user !== 1) : [...doubt.downvotedBy, 1],
            };
          }
        }
        return doubt;
      })
    );
  };

  const ChatMessages: React.FC = () => (
    <div id="chatbox" className="overflow-y-auto h-[60%] rounded-2xl text-[0.75rem] p-2">
      {doubts.map((doubt) => (
        <div key={doubt.id} className="mb-2 border-gray-500 border-2 rounded-xl p-2">
          <strong>{doubt.title}</strong>: {doubt.description}
          <div>
            <div className="mt-2">
              {doubt.tags.map((tag) => (
                <button key={tag} className="bg-yellow-500 text-gray-800 px-2 py-1 rounded-md mr-2">
                  {tag}
                </button>
              ))}
            </div>
            <div className="mt-2">
              <button onClick={() => handleVote(doubt.id, 'upvote')} className="text-green-500">
                Upvote ({doubt.upvotes})
              </button>
              <button onClick={() => handleVote(doubt.id, 'downvote')} className="text-red-500 ml-2">
                Downvote ({doubt.downvotes})
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );  

  const DoubtForm: React.FC = () => (
    <div className="mt-4 absolute bottom-0 w-full p-4 text-black">
      {/* Doubt Form */}
      <input
        type="text"
        placeholder="Doubt Title"
        value={currentDoubt.title}
        onChange={(e) => setCurrentDoubt({ ...currentDoubt, title: e.target.value })}
        className="border border-gray-300 p-2 mb-2 w-full text-sm"
      />
      <textarea
        placeholder="Doubt Description"
        value={currentDoubt.description}
        onChange={(e) => setCurrentDoubt({ ...currentDoubt, description: e.target.value })}
        className="border border-gray-300 p-2 mb-2 w-full text-sm"
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={currentDoubt.tags}
        onChange={(e) => setCurrentDoubt({ ...currentDoubt, tags: e.target.value })}
        className="border border-gray-300 p-2 mb-2 w-full text-sm"
      />
      <button onClick={handlePostDoubt} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Send
      </button>
    </div>
  );

  const getFilteredDoubts = (minUpvotes: number) => doubts.filter((doubt) => doubt.upvotes >= minUpvotes);

  const DoubtsColumn: React.FC<{ title: string; minUpvotes: number }> = ({ title, minUpvotes }) => {
    const filteredDoubts = getFilteredDoubts(minUpvotes);
  
    return (
      <div className="flex-1 border-2 border-gray-500 rounded-2xl text-[0.75rem] p-2">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <ul>
          {filteredDoubts.map((doubt) => (
            <li key={doubt.id} className="mb-4 border-gray-500 border-2 rounded-xl p-2">
              <strong>{doubt.title}</strong>: {doubt.description}
              <div>
                <div className="mt-2">
                  {doubt.tags.map((tag) => (
                    <button key={tag} className="bg-yellow-500 text-gray-800 px-2 py-1 rounded-md mr-2">
                      {tag}
                    </button>
                  ))}
                </div>
                <div className="mt-2">
                  <button onClick={() => handleVote(doubt.id, 'upvote')} className="text-green-500">
                    Upvote ({doubt.upvotes})
                  </button>
                  <button onClick={() => handleVote(doubt.id, 'downvote')} className="text-red-500 ml-2">
                    Downvote ({doubt.downvotes})
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex space-x-4 p-10 gap-10 bg-black text-white h-[100vh]">
      {/* Column 1: Chatbox */}
      <div className="flex-1 border-2 border-gray-500 flex flex-col relative h-full rounded-2xl">
        <ChatMessages />
        <DoubtForm />
      </div>

      {/* Column 2: Doubts with 3+ Upvotes */}
      <DoubtsColumn title="Doubts (3+ Upvotes)" minUpvotes={3} />

      {/* Column 3: Doubts with 10+ Upvotes */}
      <DoubtsColumn title="Doubts (10+ Upvotes)" minUpvotes={10} />
    </div>
  );
};

export default DoubtBox;