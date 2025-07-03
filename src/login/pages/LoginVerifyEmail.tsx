import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import logoPngUrl from "../assets/logo.png";

export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, user, message } = kcContext;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={<></>} displayMessage={false}>
            <div className="header-container">
                <img src={logoPngUrl} alt="Logo" className="header-logo" />
            </div>

            <div className="login-container">
                <div className="login-header">Verify your email</div>

                <div className="verify-email-description">
                    We&apos;ve sent a verification email to <strong>{user?.email}</strong>. Please check your inbox and click the link to verify your
                    account.
                </div>

                {message && <div className={`message ${message.type}`}>{message.summary}</div>}

                <div className="login-form-container">
                    <div className="verify-email-actions">
                        <a href={url?.loginUrl} className="login-button verify-email-button">
                            Back to Sign In
                        </a>

                        <div className="resend-email-section">
                            <span className="signup-text">Didn&apos;t receive the email? </span>
                            <a href={url?.loginAction} className="signup-link-text">
                                Resend verification email
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-links">
                    <a href="#" className="footer-link">
                        Terms of Use
                    </a>
                    <span className="footer-separator"> | </span>
                    <a href="#" className="footer-link">
                        Privacy Policy
                    </a>
                </div>
            </div>
        </Template>
    );
}
