import React, { useState } from 'react';
import md5 from 'md5';

interface Comment {
  id: string;
  name: string;
  email: string;
  content: string;
  timestamp: string;
}

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  const getGravatarUrl = (email: string) => {
    const hash = md5(email.toLowerCase().trim());
    return `https://www.gravatar.com/avatar/${hash}?d=mp&s=50`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newComment: Comment = {
      id: Date.now().toString(),
      name,
      email,
      content,
      timestamp: new Date().toISOString()
    };

    setComments([...comments, newComment]);
    setContent('');
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-6">Comments</h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email (for Gravatar)
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="your@email.com"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Comment
          </label>
          <textarea
            id="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            placeholder="Write your comment here..."
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          Post Comment
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center">Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <img
                src={getGravatarUrl(comment.email)}
                alt={comment.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-gray-900">{comment.name}</h4>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-1 text-gray-600">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;