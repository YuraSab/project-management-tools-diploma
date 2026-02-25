# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```




## 🚀 Project Launch Instructions

1. Clone the Repository
Open your terminal and run:
```bash
git clone https://github.com/YuraDev/project-management-tools.git
```

2. Navigate to the Project Directory
```bash
cd project-management-tools
```

3. Install Dependencies
```bash
npm install
```

💡 Note: If Node.js is not installed, check your version with:
```bash
node -v
```
💡...and install it from https://nodejs.org/

4. (Optional) Switch to the Tailwind Branch
If you want to use the version with Tailwind CSS:
```bash
git checkout feature/tailwind-implementation
```

5. Start the Frontend
In the root of the project, run:
```bash
npm run dev
```

6. Start the Backend (Mock Server)
In a new terminal window (also at the project root), run:
```bash
npx json-server --watch db.json --port 3001
```

7. Open the App in Your Browser
http://localhost:5173/

8. Login Credentials
Use one of the following login options:

| Role    | Username | Password |
|---------|----------|----------|
| Admin   | admin    | password |
| Manager | yurii    | 1111     |
| Member  | member   | password |

You can also register with your own credentials, but your role will be set to **member**.