import './App.css';
import Header from './components/header/header.jsx';
import MainHero from './components/mainHero/mainHero.jsx';
import Core from './components/Core/Core.jsx';
import Footer from './components/footer/footer.jsx';

function App() {

  return (
    <>
      <header className='header'>
        <Header />
      </header>

      <main className="mainHero">
        <MainHero />
      </main>

      <div className="content">

        <main className='core' id='core'>
          <Core />
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
