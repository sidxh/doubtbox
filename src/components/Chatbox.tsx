"use client"

export default function Chatbox(){
    return(
        <div className="flex-1 border-2 border-black flex flex-col">
        <div className="flex-grow">
          <h2 className="text-lg font-semibold mb-2">Chatbox</h2>
          <ChatMessages />
        </div>
        <div className="mt-4">
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
      </div>
    )
}