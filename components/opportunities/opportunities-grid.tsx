import { ArrowUpRight, Building2, MapPin, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { generateOpportunities } from "@/lib/mockAI";

export function OpportunitiesGrid() {
  const opportunities = generateOpportunities();

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {opportunities.map((opportunity) => (
        <Card
          key={opportunity.id}
          className="flex min-h-[310px] flex-col transition hover:-translate-y-1 hover:border-blue/35"
        >
          <CardHeader>
            <div className="mb-4 flex items-start justify-between gap-3">
              <Badge variant="blue">
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                {opportunity.matchScore}% match
              </Badge>
              <Badge variant="outline">{opportunity.type}</Badge>
            </div>
            <CardTitle>{opportunity.role}</CardTitle>
            <div className="mt-3 space-y-2 text-sm text-slate-400">
              <p className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-slate-500" />
                {opportunity.company}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-500" />
                {opportunity.location}
              </p>
            </div>
          </CardHeader>
          <CardContent className="mt-auto space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-400">Match Score</span>
                <span className="font-medium text-cyan-100">
                  {opportunity.matchScore}%
                </span>
              </div>
              <Progress value={opportunity.matchScore} />
            </div>
            <div className="flex flex-wrap gap-2">
              {opportunity.requiredSkills.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
            <Button className="w-full">
              Apply
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
