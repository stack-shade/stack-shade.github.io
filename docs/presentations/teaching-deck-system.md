# StackShade Teaching Deck System

StackShade presentations are browser-native teaching environments, not exported PowerPoint files.

## Why browser-native

The presenter needs:

- fullscreen;
- predictable keyboard navigation;
- live pointer;
- presenter notes;
- interactive diagrams;
- animation;
- timers;
- slide overview;
- consistent UI;
- direct screen recording.

Those are easier to maintain as one React presentation system than as hundreds of independent slide files.

## One engine, many decks

```
course data
   +
topic guide
   ↓
course-presentation.ts
   ↓
12 slide objects
   ↓
CoursePresentationPlayer
   ↓
fullscreen teaching experience
```

## 12-slide teaching grammar

**Context → target → intuition → mechanism → flow → visual → artifact → example → pitfalls → recall → teach-back → compression**

## Speaker behavior

A slide should answer one of these questions:

- What are we learning?
- Why does it exist?
- How does it work?
- What does it look like?
- Where does it fail?
- Can I reproduce it?
- Can I use it somewhere else?

## Maintenance

Do not duplicate slide UI for a course.

Add:
- course data;
- topic guides;
- visual data;
- presenter notes.

Only modify the player when a new interaction pattern is needed.
