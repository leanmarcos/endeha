import './App.css';
import Header from './components/header/header.jsx';
import MainHero from './components/mainHome/mainHome';
import cypherInfo from './components/cypherInfo/cypherInfo.jsx';
import Footer from './components/footer/footer.jsx';

function App() {

  return (
    <>
      <header>
        <Header />
      </header>

      <div className="content">

        <main className='mainHero'>
          <MainHero />
        </main>

        <section>
          <cypherInfo />
        </section>
      </div>

      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
