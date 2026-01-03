
export const QuickThoughts = () => {
  const thoughts = [
    {
      id: 1,
      content: "The most important breakthroughs often happen at the intersections of disciplines.",
      timestamp: "2h"
    },
    {
      id: 2,
      content: "AI will amplify human capabilities, not replace human judgment. The key is knowing when to trust each.",
      timestamp: "6h"
    },
    {
      id: 3,
      content: "Reading 'The Innovator's Dilemma' again. Clayton Christensen's insights feel more relevant than ever in the age of AI.",
      timestamp: "1d"
    }
  ];

  return (
    <section className="py-12 border-b border-gray-100">
      <h3 className="text-lg font-medium text-foreground mb-6">Recent Thoughts</h3>
      
      <div className="space-y-6">
        {thoughts.map((thought) => (
          <div key={thought.id} className="group">
            <p className="text-foreground leading-relaxed mb-2">
              {thought.content}
            </p>
            <span className="text-xs text-muted-foreground">
              {thought.timestamp} ago
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
