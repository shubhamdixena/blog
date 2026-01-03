import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Archive, Calendar } from "lucide-react";

const archiveData = [
  {
    year: 2024,
    months: [
      { name: "March", count: 8, active: true },
      { name: "February", count: 12, active: false },
      { name: "January", count: 8, active: false }
    ]
  },
  {
    year: 2023,
    months: [
      { name: "December", count: 6, active: false },
      { name: "November", count: 9, active: false },
      { name: "October", count: 11, active: false },
      { name: "September", count: 7, active: false }
    ]
  }
];

export const ArchiveExplorer = () => {
  return (
    <section id="archive" className="animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Archive className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-semibold">Archive Explorer</h2>
        </div>
        <p className="text-muted-foreground">Browse thoughts by time and discover forgotten gems</p>
      </div>
      
      <div className="space-y-6">
        {archiveData.map((yearData) => (
          <Card key={yearData.year} className="transition-all duration-200 hover:shadow-md">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {yearData.year}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {yearData.months.map((month) => (
                  <div 
                    key={month.name}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-sm ${
                      month.active 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'bg-card hover:bg-accent/50 border-border'
                    }`}
                  >
                    <div className="text-sm font-medium mb-1">{month.name}</div>
                    <Badge 
                      variant={month.active ? "secondary" : "outline"} 
                      className="text-xs"
                    >
                      {month.count} posts
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
