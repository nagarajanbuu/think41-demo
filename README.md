# Think41 Demo – Collaborative Text Editor

A real-time collaborative text editor built using **Vite**, **React**, **TypeScript**, and **ShadCN UI**, featuring synchronized scrolling, current line highlighting, and document loading capabilities.

## 🚀 Features

- ✅ **Synchronized Scrolling** between multiple panes
- ✅ **Current Line Highlighting** as the user types
- ✅ **Load Document from File**
- ✅ Clean UI built with **ShadCN + Tailwind CSS**
- ✅ Modular design using `components/`, `hooks/`, and `lib/`

## 🛠️ Tech Stack

| Layer        | Technology Used                      |
|--------------|--------------------------------------|
| Frontend     | Vite, React, TypeScript              |
| UI Framework | ShadCN UI, Tailwind CSS              |
| State Mgmt   | React useState & custom hooks        |
| File Loading | HTML5 FileReader API                 |

## 🧩 Folder Structure

```bash
src/
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── pages/         # Page-level components
├── App.tsx        # Main application
├── index.css      # Global styles
├── main.tsx       # Entry point
