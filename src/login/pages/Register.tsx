import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import logoPngUrl from "../assets/logo.png";

export default function Register(props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const { url, messagesPerField, recaptchaRequired, recaptchaSiteKey, termsAcceptanceRequired } = kcContext;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={<></>}>
            <div className="header-container">
                <img src={logoPngUrl} alt="Logo" className="header-logo" />
            </div>

            <div className="login-container">
                <div className="login-header">Create an account</div>

                <div className="login-form-container">
                    <form
                        id="kc-register-form"
                        action={url.registrationAction}
                        method="post"
                        onSubmit={() => {
                            setIsFormSubmitted(true);
                            return true;
                        }}
                    >
                        <div className="login-input-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="login-input"
                                placeholder="Email address"
                                autoComplete="email"
                                required
                                aria-invalid={messagesPerField.existsError("email")}
                            />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="login-input"
                                placeholder="Password"
                                autoComplete="new-password"
                                required
                                aria-invalid={messagesPerField.existsError("password")}
                            />
                            <input
                                type="password"
                                id="password-confirm"
                                name="password-confirm"
                                className="login-input"
                                placeholder="Confirm Password"
                                autoComplete="new-password"
                                required
                                aria-invalid={messagesPerField.existsError("password-confirm")}
                            />
                        </div>

                        {recaptchaRequired && <div className="g-recaptcha" data-sitekey={recaptchaSiteKey} data-size="compact"></div>}

                        {termsAcceptanceRequired && (
                            <div className="checkbox-container">
                                <label>
                                    <input
                                        type="checkbox"
                                        id="termsAccepted"
                                        name="termsAccepted"
                                        aria-invalid={messagesPerField.existsError("termsAccepted")}
                                    />
                                    <span className="terms-text">
                                        I agree to the{" "}
                                        <a href="#" className="signup-link-text">
                                            Terms of Service
                                        </a>
                                    </span>
                                </label>
                                {messagesPerField.existsError("termsAccepted") && (
                                    <span className="error-message">{messagesPerField.get("termsAccepted")}</span>
                                )}
                            </div>
                        )}

                        <button className="login-button" type="submit" disabled={isFormSubmitted}>
                            Create Account
                        </button>

                        <div className="signup-link">
                            <span className="signup-text">Already have an account? </span>
                            <a href={url.loginUrl} className="signup-link-text">
                                Sign in
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
