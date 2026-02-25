import { useEffect } from 'react';
import styles from './App.module.css';
import Header from './components/header/header/Header';
import RouteLayout from './layouts/routeLayout/RouteLayout';
import { useUserThemeStore } from './store/userThemeStore';
import { useUserStore } from './store/userStore';
import { auth } from './firebase';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const currentUser = useUserStore((state) => state.currentUser);
  const highlightMode = useUserThemeStore((state) => state.highlightMode);
  const backgroundMode = useUserThemeStore((state) => state.backgroundMode);

  const user = useAuthStore((state) => state.user);
  const setLogoutUser = useAuthStore((state) => state.setLogoutUser);


  useEffect(() => {
    document.body.style.color = backgroundMode === "black" ? "white" : "black";
    document.body.style.backgroundColor = backgroundMode === "black" ? "black" : "white";
  }, [highlightMode, backgroundMode]);


  useEffect(() => {
  console.log(auth.currentUser?.email)
  console.log('user', user)
  }, [auth]); // todo - temporary test

  return (
    <div className={styles.structure}>
      {
        currentUser &&
        <header style={{ borderColor: highlightMode ? highlightMode : "purple" }}>
          <Header />
        </header>
      }
      <main><RouteLayout /></main>
      <h3 onClick={() => setLogoutUser()}>Hello</h3>
    </div>
  )
}

export default App;