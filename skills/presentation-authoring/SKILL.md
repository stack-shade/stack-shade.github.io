---
name: presentation-authoring
description: Maintain the centralized StackShade browser presentation system used to teach every course topic during screen recording.
---

# Presentation Authoring Skill

## Architecture

There is one presentation engine for every course.

### Data
`src/lib/course-presentation.ts`

Transforms course/module/lesson metadata plus course-specific rich guides into a 12-slide teaching deck.

### Design tokens
`src/lib/presentation-design-system.ts`

Owns:
- stage colors;
- content panel colors;
- borders;
- typography classes;
- accents;
- keyboard shortcuts;
- autoplay timing.

### Renderer
`src/components/courses/course-presentation-player.tsx`

Owns:
- transitions;
- fullscreen;
- keyboard controls;
- overview;
- notes;
- pointer;
- timer;
- autoplay;
- progress.

### Route
`/courses/<course>/present/<lesson>`

Generated for every course topic by static params.

## Slide contract

Default sequence:

1. title/context;
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
12. compressed summary and transfer.

This is intentionally compact enough for one recorded teaching video while still supporting depth.

## Animation rules

Animations must communicate state change:

- reveal one flow step at a time;
- move attention toward the active component;
- animate progression, not decoration;
- respect `prefers-reduced-motion`.

Do not add continuous motion simply to make a slide look alive.

## Recording UX

The presenter should be able to:

- enter fullscreen;
- advance with Space or ArrowRight;
- go back with ArrowLeft;
- open notes;
- show a pointer;
- jump through an overview;
- reset the timer;
- leave autoplay disabled during most teaching.

## Future extension

Add a new slide kind only when the existing slide vocabulary cannot express the learning goal.

Prefer a new data field over a new component.

## Quality checklist

- readable at 1080p screen recording;
- no dense paragraphs;
- one visual idea per slide;
- visible slide numbers;
- consistent spacing and typography;
- no course-specific color hacks;
- keyboard navigation works;
- fullscreen works;
- reduced motion works;
- presentation route is statically generated.
