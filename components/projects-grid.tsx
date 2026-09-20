"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import type { ProjectDetail, ProjectCategory } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { ProjectDrawer } from "./project-drawer";
import { cn } from "@/lib/utils";

const categories: ("Tất cả" | ProjectCategory)[] = [
  "Tất cả",
  "AI & Data Science",
  "Tin học Y tế",
  "Chuyển đổi số & Vận hành",
  "Full-stack System",
];

export function ProjectsGrid({ projects }: { projects: ProjectDetail[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory =
        selectedCategory === "Tất cả" || p.category === selectedCategory;
      const matchSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.org.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.stack?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Category filters & Search Bar */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all",
                selectedCategory === cat
                  ? "bg-foreground text-background shadow-sm"
                  : "border border-border bg-card text-muted-foreground hover:border-accent/50 hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm theo tên, công nghệ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-border bg-card py-1.5 pl-9 pr-4 text-xs placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((p, i) => (
            <ProjectCard
              key={p.slug || p.title}
              project={p}
              index={i}
              onSelect={setActiveProject}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          Không tìm thấy dự án nào khớp với bộ lọc.
        </div>
      )}

      {/* Interactive Project Drawer */}
      <ProjectDrawer
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
}
