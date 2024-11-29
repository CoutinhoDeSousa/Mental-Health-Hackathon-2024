import React from 'react';

const InfoPage = () => {
    // Liste von Links (dynamisch anpassbar)
    const links = [
        {
            title:"MUT-TOUR",
            description: "Die MUT-TOUR ist ein Aktionsprogramm, bei dem Menschen mit und ohne Depressionserfahrung zusammenkommen, um sich für einen offenen Umgang mit dem Thema Depressionen stark zu machen.",
            url:"https://www.mut-tour.de/"
        },
        {
            title:"TelefonSeelsorge Deutschland",
            description: "Sie sind nicht allein – Unterstützung in schwierigen Lebenslagen",
            url:"https://www.telefonseelsorge.de/"
        },
        {
            title:"Autism Connect Search:",
            description:"Eine Liste an Peer Support Gruppen zur Unterstützung im Umgang mit Autismus",
            url:"https://search.amaze.org.au/s/article/Find-a-Peer-Support-Group-Online"
        },
        {
            title: "Hilfe & Support",
            description: "Hier finden Sie Anleitungen und Unterstützung.",
            url: "https://www.mentalcheck.com/support"
        },
        {
            title: "Kontakt",
            description: "Treten Sie mit uns in Kontakt.",
            url: "https://www.mentalcheck.com/contact"
        },
        {
            title: "Datenschutz",
            description: "Lesen Sie unsere Datenschutzrichtlinien.",
            url: "https://www.mentalcheck.com/privacy"
        }
    ];

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Informationen</h1>
            <div className="row">
                {links.map((link, index) => (
                    <div className="col-md-4 col-sm-6 mb-4" key={index}>
                        <div className="card h-100 d-flex flex-column">
                            <div className="card-body flex-grow-1 d-flex flex-column">
                                <h5 className="card-title">{link.title}</h5>
                                <p className="card-text flex-grow-1">{link.description}</p>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary mt-auto"
                                >
                                    Mehr erfahren
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfoPage;
