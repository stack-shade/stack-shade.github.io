
---
name: course-authoring
description: End-to-end standard for creating StackShade courses, topics, articles, visuals, presentations, retrieval loops, metadata, navigation and responsive learning experiences.
---

# StackShade Course Authoring Skill

Use this skill whenever creating, expanding, redesigning or repairing a course under /courses.

## Product rule

Every course topic is a complete learning unit, not just a curriculum row.

Every topic must have:
1. a stable article URL;
2. a presentation/deck route;
3. a visual explanation;
4. a concrete artifact;
5. active recall;
6. a teach-back challenge;
7. previous/next navigation;
8. responsive mobile and desktop rendering.

The article is the durable learning surface. Presentation mode is the screen-recordable teaching surface.

## 1. Course architecture

Course source of truth:

' src/lib/courses-data.ts '

A course contains:
- slug
- title
- tagline
- description
- level
- duration
- category
- icon
- outcomes
- modules
- optional featured

A module contains:
- title
- phase
- hook
- feynman
- lessons
- recall

A lesson contains:
- title
- type
- duration
- optional href

Lesson types:
- video
- article
- interactive
- practice
- project
- quiz

The type describes the primary teaching activity, not whether the lesson has an article. Every topic gets an article companion.

## 2. URL model

Course:
'/courses/<course-slug>'

Topic article:
'/courses/<course-slug>/<generated-lesson-slug>'

Presentation:
'/courses/<course-slug>/present/<generated-lesson-slug>'

Generated lesson slugs must be stable:

'm<module-number>-l<lesson-number>-<slugified-title>'

Do not silently change an existing public topic slug.

## 3. Course creation stages

Create a course in these stages and do not skip the first three.

### Stage A — Define the learner transformation

Write 3–6 outcomes using verbs:
- recognize
- explain
- reconstruct
- implement
- debug
- compare
- design

Avoid vague outcomes such as “understand everything about X”.

### Stage B — Map the prerequisite graph

For each module identify:
- prerequisites;
- the new concept;
- what misconception it corrects;
- what later concept depends on it.

Order modules so each one creates the mental prerequisite for the next.

### Stage C — Give each module a memory hook

A module hook is one sentence that compresses the idea.

Examples:
- “Grow right until invalid, shrink left until valid.”
- “Hashing trades memory for lookup time.”
- “A router chooses the next hop, not the final application.”

The hook is not a substitute for the lesson. It is the retrieval cue.

### Stage D — Build topic units

Each topic should answer:
1. What problem exists?
2. What mental model makes it memorable?
3. What mechanism solves it?
4. What does the learner observe?
5. When should it be used?
6. What commonly goes wrong?
7. Can the learner reconstruct it without notes?

### Stage E — Author the article

Use the topic article standard in 'skills/article-authoring/SKILL.md'.

### Stage F — Author the presentation

Use the centralized presentation engine:
- 'src/lib/course-presentation.ts'
- 'src/lib/presentation-design-system.ts'
- 'src/components/courses/course-presentation-player.tsx'

Add data rather than duplicating slide UI.

### Stage G — Add interactions

Prefer the smallest interaction that teaches the concept:
- stepper
- simulator
- calculator
- drag/drop
- state machine
- timeline
- comparison view

Do not ship interaction just because it is technically possible.

### Stage H — Connect retrieval and transfer

Every module gets recall questions.

Every rich topic gets topic-level recall questions and a Feynman prompt.

Every topic ends with a transfer connection.

## 4. Topic article stages

Author every topic in this order:

### 01 — Orient

Short lede:
- what the topic is;
- why it exists;
- where it sits in the system.

### 02 — Mental model

One memorable analogy or structural model.

Also state where the analogy stops being exact when needed.

### 03 — Mechanism

Use 2–5 focused sections.

Write causal explanations:

'input → transformation → constraint/decision → output'

Avoid definition walls.

### 04 — Visual reasoning

At least one meaningful diagram.

Preferred forms:
- inline SVG
- architecture map
- state machine
- timeline
- packet/frame diagram
- table
- plot
- animated flow
- interactive simulator

A visual must communicate a relationship, not decorate the page.

### 05 — Artifact

Show one inspectable object:
- code
- command
- packet
- formula
- configuration
- query
- trace
- worked example

Explain exactly what the learner should notice.

### 06 — Misconceptions

Show the incorrect mental model and the correction.

Keep this specific to the topic.

### 07 — Retrieval

At least two prompts.

Sequence:
1. question;
2. pause;
3. learner answers;
4. reveal;
5. compare;
6. reconstruct.

### 08 — Transfer

Finish with:
- Feynman teach-back;
- exam/interview angle;
- adjacent concept;
- next action.

## 5. Learning-science patterns

Use these deliberately:
- retrieval practice;
- spaced review;
- chunking;
- elaboration;
- generation before explanation;
- self-explanation;
- dual coding;
- worked example followed by independent reconstruction;
- interleaving when contrast between problem types matters;
- signaling and progressive disclosure.

Do not make unsupported claims such as fixed memory gains or guaranteed percentages.

## 6. Visual rules

A good learning sequence is:

'read → predict → see → explain → inspect → retrieve → apply'

Avoid:

'paragraph → paragraph → paragraph → quiz'

Reveal complexity gradually.

Animation should show:
- flow;
- state;
- time;
- comparison;
- cause/effect.

Always support reduced motion.

## 7. Presentation rules

Default deck:
1. context/title;
2. learning target;
3. mental model;
4. core concept;
5. causal flow;
6. visual reasoning;
7. artifact;
8. worked example;
9. misconceptions;
10. active recall;
11. teach-back;
12. compression + next move.

Slides should be visually sparse compared with articles.

Never copy the entire article into slides.

## 8. Responsive product rules

### Mobile

Design for one-handed use and narrow screens:
- compact top bar;
- no giant menu typography;
- no viewport-height article cards;
- readable 16–20px side padding;
- controls remain tappable;
- lesson action buttons visible without horizontal scrolling;
- code blocks scroll internally;
- diagrams scale or scroll internally;
- no fixed element may cover the reading path.

### Desktop

Use:
- readable article measure;
- sticky mini outline where helpful;
- wider visual stages;
- hover/focus affordances;
- keyboard shortcuts in presentation mode.

## 9. Navigation

The curriculum row must provide:
- Read;
- Present;
- completion control.

The course topic page must provide:
- Course overview;
- Article;
- Presentation;
- Previous;
- Next;
- mark complete/review state where applicable.

Never make the presentation the only route to a topic.

## 10. SEO and indexing

Every topic article should have:
- title metadata;
- description metadata;
- canonical URL;
- LearningResource JSON-LD;
- static params;
- sitemap entry when indexable.

Presentation pages should normally be noindex.

## 11. Accessibility

- every diagram has a meaningful label/caption;
- color is not the only signal;
- buttons have accessible names;
- focus states are visible;
- keyboard navigation works in presentation mode;
- reduced motion is respected;
- code does not force viewport width;
- disclosure answers remain accessible to keyboard and screen readers.

## 12. Technical accuracy

For engineering topics:
- distinguish abstractions from implementations;
- label beginner simplifications;
- include important boundary cases;
- prefer current standards terminology;
- never turn an analogy into an implementation claim.

For networking specifically:
- distinguish MAC, IP and ports;
- distinguish hop-by-hop framing from end-to-end transport;
- distinguish recursive DNS resolution from authoritative data;
- distinguish TCP flow control from congestion control;
- distinguish application semantics from transport behavior.

## 13. Definition of done

A course is done only when:
- course metadata renders;
- every module is navigable;
- every topic has an article route;
- every topic has a presentation route;
- every topic has at least one meaningful visual;
- every topic has a concrete artifact;
- every topic has retrieval;
- previous/next navigation works;
- progress still persists;
- mobile has no overflow;
- presentation fullscreen works;
- reduced motion works;
- metadata and static generation succeed;
- representative course/article/deck routes build successfully.

## 14. File map

Core data:
' src/lib/courses-data.ts '

Universal lesson content:
' src/lib/course-lesson-content.ts '

Article renderer:
' src/components/courses/lesson-article.tsx '

Course study/curriculum:
' src/components/courses/course-study.tsx '

Presentation data:
' src/lib/course-presentation.ts '

Presentation renderer:
' src/components/courses/course-presentation-player.tsx '

Presentation design tokens:
' src/lib/presentation-design-system.ts '

Rich Computer Networks lessons:
' src/lib/computer-networks-lessons.ts '

Article authoring guidance:
' skills/article-authoring/SKILL.md '
