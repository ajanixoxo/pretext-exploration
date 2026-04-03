---
description: atomic commit flow for reviewer clarity 4 status check 5 status check status report 4 status check 5 status check status report status 4 status check 5 status check status report status 4 status check 5 status check status report status 4 status check 5 status check status report status [truncated]
---

# Atomic Commit Workflow

Use this workflow to stage and commit changes in a logical sequence that a reviewer can easily understand.

## Prerequisites
- Files have been modified or created and verified.

## Steps

1. **Check Status Once**
   - Run `git status -u` to identify all changed and untracked files.

2. **Stage and Commit Groups**

   - **Group 1: Infrastructure & Build**
     ```bash
     git add package.json bun.lock tsconfig.json .gitignore
     git commit -m "build/chore: update dependencies and configuration"
     ```

   - **Group 2: Data Models & State**
     ```bash
     git add lib/store.ts lib/types.ts lib/utils.ts
     git commit -m "feat/state: implement logic and global state"
     ```

   - **Group 3: UI Components**
     ```bash
     git add components/
     git commit -m "feat/ui: implement modular chat components and layouts"
     ```

   - **Group 4: App Integration**
     ```bash
     git add app/
     git commit -m "feat/integration: unite components into app entry points"
     ```

// turbo
3. **Verify History**
   - Run `git log -n 5 --oneline` to confirm the sequence.

---
**Persistent Goal**: Minimize tokens by skipping redundant "sanity checks" if the changes are already well-understood from previous tool outputs.
