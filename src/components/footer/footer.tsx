import './footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="page-width footer__container">
                <div className="footer__container__creator">
                    Created by: <b>Justin van Dijk</b>
                </div>
                <div className="footer__container__technologies">
                    <ul>
                        <li>React</li>
                        <li>Google Firebase</li>
                        <li>Axios / API handling</li>
                        <li>Typescript</li>
                        <li>SCSS/SASS</li>
                        <li>SASS BEM naming</li>
                        <li>React Routing</li>
                        <li>React Hooks</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;