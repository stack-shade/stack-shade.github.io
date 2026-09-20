# Course Content Architecture

## Canonical data flow

```
COURSES
  ↓
Course
  ↓
CourseModule[]
  ↓
Lesson[]
  ↓
Presentation generator
  ↓
Browser presentation
```

Rich course-specific material can sit beside the canonical curriculum:

```
courses-data.ts
     +
<course>-course-content.ts
     ↓
course-presentation.ts
     ↓
shared player
```

## Rules

1. Curriculum metadata is the source of truth for ordering.
2. Lesson slugs remain stable once published.
3. Presentation pages are generated from data.
4. Visualizations belong in reusable components.
5. Learning-science behavior belongs in shared study components.
6. Avoid course-specific UI copies.
7. Add documentation when architecture changes.
