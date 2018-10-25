import './styles/index.scss';
import Footer from './components/Footer';

const renderApp = () => {
  return `<h1 class="test">Hello Parcel!</h1>
            <div>
              Look
              <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">right nea baby</a>
              for more info about Parcel.
            </div>
  `;
}

document.getElementById("app").innerHTML = renderApp();
