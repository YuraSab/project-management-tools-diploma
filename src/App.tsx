import { useEffect } from 'react';
import styles from './App.module.css';
import Header from './components/header/header/Header';
import RouteLayout from './layouts/routeLayout/RouteLayout';
import { useUserThemeStore } from './store/userThemeStore';
import { useUserStore } from './store/userStore';

function App() {
  const currentUser = useUserStore((state) => state.currentUser);
  const highlightMode = useUserThemeStore((state) => state.highlightMode);
  const backgroundMode = useUserThemeStore((state) => state.backgroundMode);

  useEffect(() => {
    document.body.style.color= backgroundMode === "black" ? "white" : "black";
    document.body.style.backgroundColor = backgroundMode === "black" ? "black" : "white";
  }, [highlightMode, backgroundMode]);

  return(
    <div  className={styles.structure}>
      { currentUser &&  <header  style={{ borderColor: highlightMode ? highlightMode : "purple"}}><Header/></header>}
      <main><RouteLayout/></main>
    </div>
  )
}

export default App;