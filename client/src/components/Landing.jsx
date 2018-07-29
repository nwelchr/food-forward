import React from 'react';



class Landing extends React.Component {
    constructor(props) {
        super(props);
    }

    showmodal() {
        let modal = document.getElementById('myModal');
        let content = document.getElementsByClassName('modal-content')[0];
        modal.style.display = "block";
        content.style.top = "50%";
    }

    closemodal() {
        let modal = document.getElementById('myModal');
        let content = document.getElementsByClassName('modal-content')[0];
        modal.style.display = 'none';
        content.style.top = '-400%';
    }

    render() {
        let modal = document.getElementById('myModal');
        let content = document.getElementsByClassName('modal-content')[0];
        return (
            <div>
                <div className="landing">
                    <h1 className="landing-title">Food Forward</h1>
                    <h3 className="landing-blurp">
                        Give back, get less taxes
                    </h3>
                    <button onClick={() => this.showmodal()} id="mdl-btn" className="landing-cta">
                        Give Back
                    </button>
                </div>
                <div className="modal-content">
                    <div className="sign-in-text">
                        <p>Sign in with Google</p>
                        <span onClick={() => this.closemodal()} className="close">&times;</span>
                    </div>
                    <a href={"/auth/google"}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png"/></a>
                </div>
                <div onClick={() => this.closemodal()} id="myModal" className="modal"></div>
            </div>
        );
    }

};

export default Landing;
