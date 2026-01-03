
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Subscribing email:", email);
    setIsSubscribed(true);
    setEmail("");
  };

  if (isSubscribed) {
    return (
      <section className="py-12">
        <div className="text-center">
          <h3 className="text-lg font-medium text-foreground mb-2">Thanks for subscribing!</h3>
          <p className="text-sm text-muted-foreground">
            You'll receive new articles and insights directly in your inbox.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-md mx-auto text-center px-4">
        <h3 className="text-lg font-medium text-foreground mb-2">Stay Updated</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Get new articles and insights delivered directly to your inbox. No spam, unsubscribe anytime.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-3 py-2 text-sm border border-input rounded-sm focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring"
            required
          />
          <Button 
            type="submit"
            className="px-6 py-2 text-sm bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 w-full sm:w-auto"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};
