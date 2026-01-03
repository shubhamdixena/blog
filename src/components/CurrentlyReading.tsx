
export const CurrentlyReading = () => {
  const books = [
    {
      id: 1,
      title: "The Alignment Problem",
      author: "Brian Christian",
      status: "reading",
      progress: 68,
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=80&h=120&fit=crop"
    },
    {
      id: 2,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      status: "finished",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=80&h=120&fit=crop"
    },
    {
      id: 3,
      title: "The Age of AI",
      author: "Henry Kissinger",
      status: "next",
      cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=80&h=120&fit=crop"
    }
  ];

  return (
    <section className="py-12 border-b border-gray-100">
      <h3 className="text-lg font-medium text-foreground mb-6">Currently Reading</h3>
      
      <div className="flex gap-6 overflow-x-auto pb-2">
        {books.map((book) => (
          <div key={book.id} className="flex-shrink-0">
            <div className="w-16 h-24 rounded-sm overflow-hidden mb-2 bg-gray-100">
              <img 
                src={book.cover} 
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-16">
              <h4 className="text-xs font-medium text-foreground leading-tight mb-1 line-clamp-2">
                {book.title}
              </h4>
              <p className="text-xs text-muted-foreground mb-1">{book.author}</p>
              <div className="flex items-center gap-1">
                <span className={`text-xs px-1.5 py-0.5 rounded text-white ${
                  book.status === 'reading' ? 'bg-primary' : 
                  book.status === 'finished' ? 'bg-green-600' : 'bg-gray-400'
                }`}>
                  {book.status}
                </span>
                {book.progress && (
                  <span className="text-xs text-muted-foreground">
                    {book.progress}%
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
