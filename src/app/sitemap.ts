import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { COURSES } from "@/lib/courses-data";
import { presentationLessonSlug } from "@/lib/course-presentation";

const BASE = "https://stack-shade.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/courses", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/explainers", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.45, changeFrequency: "monthly" as const },
    { path: "/resources", priority: 0.55, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.35, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/editorial-policy", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const courseRoutes = COURSES.flatMap((course) => {
    const courseRoute = {
      url: BASE + "/courses/" + course.slug,
      priority: course.featured ? 0.88 : 0.78,
      changeFrequency: "weekly" as const,
    };

    const lessonRoutes = course.modules.flatMap((module, moduleIndex) =>
      module.lessons.map((lesson, lessonIndex) => ({
        url:
          BASE +
          "/courses/" +
          course.slug +
          "/" +
          presentationLessonSlug(moduleIndex, lessonIndex, lesson.title),
        priority: 0.72,
        changeFrequency: "monthly" as const,
      })),
    );

    return [
      courseRoute,
      ...lessonRoutes,
    ];
  });

  const articleRoutes = ARTICLES.map((article) => ({
    url: BASE + "/blog/" + article.slug,
    lastModified: new Date(article.date + "T00:00:00.000Z"),
    priority: article.featured ? 0.84 : 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: BASE + route.path,
      priority: route.priority,
      changeFrequency: route.changeFrequency,
    })),
    ...courseRoutes,
    ...articleRoutes,
  ];
}
