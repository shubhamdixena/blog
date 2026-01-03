
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, MapPin, Users, Mic } from "lucide-react";

const galleryItems = [
  {
    id: 1,
    type: "workspace",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    title: "Home Office Setup",
    description: "Where the ideas come to life",
    icon: Camera
  },
  {
    id: 2,
    type: "speaking",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    title: "Tech Conference 2024",
    description: "Speaking about AI in healthcare",
    icon: Mic
  },
  {
    id: 3,
    type: "travel",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    title: "Research Trip",
    description: "Studying global health initiatives in Kenya",
    icon: MapPin
  },
  {
    id: 4,
    type: "team",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
    title: "Team Collaboration",
    description: "Working with amazing researchers and developers",
    icon: Users
  },
  {
    id: 5,
    type: "workspace",
    image: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b696?w=400&h=300&fit=crop",
    title: "Late Night Coding",
    description: "Building solutions for global challenges",
    icon: Camera
  },
  {
    id: 6,
    type: "speaking",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop",
    title: "Workshop Facilitation",
    description: "Teaching machine learning fundamentals to students",
    icon: Mic
  },
  {
    id: 7,
    type: "travel",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop",
    title: "Field Research",
    description: "Understanding healthcare challenges in rural communities",
    icon: MapPin
  },
  {
    id: 8,
    type: "team",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    title: "Collaborative Innovation",
    description: "Brainstorming sessions with interdisciplinary teams",
    icon: Users
  }
];

export const VisualGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All" },
    { id: "workspace", label: "Workspace" },
    { id: "speaking", label: "Speaking" },
    { id: "travel", label: "Travel" },
    { id: "team", label: "Team" }
  ];

  const filteredItems = selectedCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.type === selectedCategory);

  return (
    <section className="py-20 animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="font-kazimir text-3xl md:text-5xl mb-4 leading-[1.1] text-[#1A1A1A] font-bold">
          Behind the Scenes
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A glimpse into the journey, collaborations, and moments that shape the work across technology, health, and global impact
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-white/90">{item.description}</p>
              </div>
            </div>
            <CardContent className="p-4 md:block group-hover:hidden transition-all duration-300">
              <h3 className="font-medium mb-1 text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No items found in this category.</p>
        </div>
      )}
    </section>
  );
};
