import {Faq, Features, Footer, Header, Navbar, Slideshow, Strip, Subscribe} from "../../components/index.jsx";
import './home.css'
const Home = () => {
    return (
        <>
            <header className="header-bg">
                <Navbar />
                <Strip/>
                <Header />
                <Strip/>
            </header>
            <Features data-aos="fade-up" />
            <Strip/>
            <Slideshow/>
            <Strip/>
            <Subscribe />
            <Faq />
            <Footer />
        </>
    )
}

export default Home