# TypeScript Classes Workshop - Master Plan

## Workshop Flow

**Duration**: 3 hours (180 minutes)  
**Approach**: Instructor-led demonstrations with hands-on coding

---

## Hour 1: Foundation (60 minutes)

### **JavaScript Classes Review (15 minutes)**

**Time**: 0:00 - 0:15

- Instructor opens `src/examples/01-basics/js-classes.js`
- Shows problems in browser console
- Students create similar JS class and observe runtime errors

### **TypeScript Classes Introduction (20 minutes)**

**Time**: 0:15 - 0:35

- Instructor opens `src/examples/01-basics/ts-classes.ts`
- Shows Vite compilation process
- Students create TypeScript class and see IDE type checking

### **Build Tools (Vite) Introduction (15 minutes)**

**Time**: 0:35 - 0:50

- Show `vite.config.ts` and HMR demonstration
- Run `npm run build` for production process
- Students experience complete development workflow

### **Live Conversion Demo (10 minutes)**

**Time**: 0:50 - 1:00

- Convert JavaScript class to TypeScript live
- Students follow conversion and see immediate benefits

---

## Hour 2: Hands-On Project (90 minutes)

### **Basic Student Class (20 minutes)**

**Time**: 1:00 - 1:20

- Create `src/examples/02-project/student-basic.ts`
- Students build basic class with constructor and methods

### **Enhanced Methods & Validation (25 minutes)**

**Time**: 1:20 - 1:45

- Extend to `src/examples/02-project/student-enhanced.ts`
- Add grade management and validation
- Students implement private properties and validation

### **Inheritance & Polymorphism (25 minutes)**

**Time**: 1:45 - 2:10

- Create `src/examples/02-project/student-advanced.ts`
- Implement Teacher class extending Person
- Students create inheritance hierarchy

### **Interface Contracts (20 minutes)**

**Time**: 2:10 - 2:30

- Define interfaces and show implementation
- Students create and implement interface contracts

---

## Hour 3: Real-World Integration (30 minutes)

### **DOM Integration (15 minutes)**

**Time**: 2:30 - 2:45

- Create `src/examples/03-advanced/dom-integration.ts`
- TypeScript classes control HTML elements
- Students create DOM manipulation class

### **Component Architecture & Deployment (15 minutes)**

**Time**: 2:45 - 3:00

- Create `src/examples/03-advanced/components.ts`
- Build reusable class-based components
- Deploy with `npm run build` and `npm run preview`

---

## Files Created During Workshop

```
src/examples/
├── 01-basics/
│   ├── js-classes.js          # Hour 1
│   └── ts-classes.ts          # Hour 1
├── 02-project/
│   ├── student-basic.ts       # Hour 2
│   ├── student-enhanced.ts    # Hour 2
│   └── student-advanced.ts    # Hour 2
└── 03-advanced/
    ├── dom-integration.ts     # Hour 3
    └── components.ts          # Hour 3
```
