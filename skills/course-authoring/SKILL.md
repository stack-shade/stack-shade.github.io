---
name: course-authoring
description: Maintainable authoring standard for StackShade course pages, lesson slugs, learning content, interactive visuals, study-science loops, SEO metadata, and course navigation.
---

# StackShade Course Authoring Skill

Use this skill whenever creating or expanding a course under `/courses`.

## 1. Course architecture

Every course is represented in `src/lib/courses-data.ts`.

A course has:
- `slug`: stable URL-safe identifier.
- `title`, `tagline`, `description`.
- `level`, `duration`, `category`, `icon`.
- `outcomes`: concrete learner outcomes.
- `modules`: ordered learning chunks.
- each module has `title`, `phase`, `hook`, `feynman`, `lessons`, and `recall`.

Lesson content types are:
- `video`: narrated explanation or lecture.
- `article`: reading/deep-dive lesson.
- `interactive`: simulator, visualizer, calculator, or explorable.
- `practice`: a deliberately scoped problem or diagnostic exercise.
- `project`: a larger build or end-to-end lab.
- `quiz`: retrieval/testing lesson.

Do not use a blog URL for a course lesson. A course lesson that has a dedicated page must use:
`/courses/<course-slug>/<lesson-slug>`

## 2. Lesson URL rules

Lesson slugs are stable public URLs. Prefer:
- lowercase
- hyphen-separated words
- no dates
- no unnecessary adjectives
- a clear concept name

Examples:
- `/courses/computer-networks/osi-model`
- `/courses/computer-networks/subnetting`
- `/courses/computer-networks/tcp-handshake`

Never rename an existing lesson slug casually because search engines and learners may already link to it.

## 3. Dedicated lesson content

For a rich course, add topic content to a course-specific content file such as:
`src/lib/computer-networks-lessons.ts`

Every rich lesson should contain:
- `overview`: what the learner will understand.
- `mentalModel`: a memorable analogy that does not distort the technical model.
- `deepDive`: multiple technically rigorous sections.
- `flow`: the process or causal sequence.
- `artifact`: a concrete representation such as packet layout, command sequence, table, formula, or configuration.
- `mistakes`: misconceptions and traps.
- `recall`: questions with hidden/revealed answers.
- `feynman`: a teach-back challenge.
- `examAngle`: likely university/interview reasoning.
- `visual`: an interactive or animated visual kind.

A lesson should teach a concept, show it, make the learner reconstruct it, and then test it.

## 4. Visual and interaction standard

Prefer:
1. animated flow or state transition;
2. labeled diagram;
3. interactive calculator/simulator;
4. packet/frame/table artifact;
5. practical command or lab artifact.

Visuals must clarify a technical relationship rather than decorate the page.

Animations should be subtle and explain state movement. Do not use motion as a substitute for labels.

## 5. Learning-science loop

Use a sequence such as:
1. Predict.
2. Visualize.
3. Explain.
4. Retrieve.
5. Apply.
6. Revisit later.

Useful techniques include retrieval practice, spaced repetition, chunking, dual coding, elaboration, generation, self-explanation, interleaving, worked examples followed by fading, signaling, and deliberate practice.

Do not make unsupported quantitative claims such as fixed memory multipliers. Prefer descriptions of the learning mechanism.

## 6. Technical accuracy rules

For networking content:
- distinguish MAC, IP, port and application identifiers;
- distinguish hop-by-hop frame behavior from end-to-end packet/transport behavior;
- distinguish TCP flow control from congestion control;
- distinguish DNS recursive resolution from authoritative data;
- distinguish a proxy from a firewall and a VPN;
- distinguish HTTP semantics from the transport below HTTP;
- state exceptions where a simplified classroom rule has important real-world edge cases.

When a simplification is used for beginners, label the simplification rather than teaching it as a universal law.

## 7. Navigation and SEO

Every dedicated lesson must:
- have a canonical URL;
- have useful title/description metadata;
- be included in `generateStaticParams`;
- be linked from the course curriculum;
- include previous/next navigation;
- be added to `public/sitemap.xml` when it is indexable.

The course overview should remain the parent hub.

## 8. New course checklist

When adding a new course:
1. Add the course object to `COURSES`.
2. Add modules in pedagogical order.
3. Pick one stable lesson slug per dedicated lesson.
4. Add lesson content data.
5. Add or reuse an appropriate visual component.
6. Link each lesson from the course curriculum.
7. Add metadata and static params.
8. Add indexable lesson URLs to the sitemap.
9. Run lint/build and verify representative lesson URLs.
10. Confirm no lesson points to a blog article unless the lesson is intentionally a cross-reference rather than dedicated course content.

## 9. Definition of done

A course lesson is not done merely because its page renders.

Done means:
- the page is technically correct;
- the learner can see the concept before reading the prose;
- a real artifact anchors the concept;
- at least one recall task requires reconstruction from memory;
- the learner can apply the concept to a small scenario;
- navigation to adjacent lessons works;
- progress tracking still functions;
- mobile layout remains readable.

## 10. Presentation mode

Every lesson automatically receives a browser-native teaching deck through the centralized presentation engine:

`/courses/<course-slug>/present/<generated-lesson-slug>`

Do not create one React page per slide and do not create PPTX files for normal course presentation mode.

The presentation system consists of:
- `src/lib/course-presentation.ts`: turns lesson/module/course data into a reusable slide deck.
- `src/components/courses/course-presentation-player.tsx`: one shared visual/interaction system for every topic.
- `src/app/(blog)/courses/[slug]/present/[lesson]/page.tsx`: static presentation route.

Standard deck length is 12 slides, designed to stay in the requested 10–15 slide range while keeping recording sessions focused:
1. title/context
2. learning target
3. mental model
4. core concept
5. causal flow
6. visual reasoning
7. concrete artifact
8. worked example
9. misconceptions
10. active recall
11. teach-back challenge
12. compressed summary + next topic

Presentation controls include:
- previous/next buttons;
- keyboard navigation with Arrow keys, Space, PageUp/PageDown;
- fullscreen;
- slide overview grid;
- presenter notes;
- elapsed timer and reset;
- autoplay;
- on-screen pointer;
- visible progress indicator;
- reduced-motion support.

### Presentation content policy

The presentation engine should prefer existing rich lesson data when available. For example, Computer Networks uses its detailed lesson content for flows, artifacts, pitfalls, recall and Feynman prompts.

For courses that only have curriculum metadata, the engine should generate a useful teaching scaffold from the module hook, lesson type, neighboring lessons, recall questions and Feynman prompt. Later, topic-specific overrides can enrich a deck without changing the renderer.

### Centralized design rule

All presentation UI/UX belongs in the presentation player. A new course should almost never require new slide-component code.

Add data, not duplicated UI.

