import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import logoPngUrl from "../assets/logo.png";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const { url, auth, messagesPerField } = kcContext;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={<></>}>
            <div className="header-container">
                <img src={logoPngUrl} alt="Logo" className="header-logo" />
            </div>

            <div className="login-container">
                <div className="login-header">Reset your password</div>
                <div className="reset-description">Enter your email address and we&apos;ll send you a link to reset your password.</div>

                <div className="login-form-container">
                    <form
                        id="kc-reset-password-form"
                        action={url.loginAction}
                        method="post"
                        onSubmit={() => {
                            setIsFormSubmitted(true);
                            return true;
                        }}
                    >
                        <div className="login-input-group">
                            <input
                                type="email"
                                id="username"
                                name="username"
                                className="login-input"
                                placeholder="Email address"
                                autoFocus
                                autoComplete="email"
                                defaultValue={auth?.attemptedUsername ?? ""}
                                aria-invalid={messagesPerField.existsError("username")}
                            />
                            {messagesPerField.existsError("username") && <span className="error-message">{messagesPerField.get("username")}</span>}
                        </div>

                        <button className="login-button" type="submit" disabled={isFormSubmitted}>
                            Send Reset Link
                        </button>

                        <div className="signup-link">
                            <a href={url.loginUrl} className="signup-link-text">
                                ← Back to Sign In
                            </a>
                        </div>
                    </form>
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
