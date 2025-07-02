import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import logoPngUrl from "../assets/logo.png";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={<></>}>
            <div className="header-container">
                <img src={logoPngUrl} alt="Logo" className="header-logo" />
            </div>

            <div className="login-container">
                <div className="login-header">Welcome back</div>

                <div className="login-form-container">
                    <form
                        id="kc-form-login"
                        onSubmit={() => {
                            setIsLoginButtonDisabled(true);
                            return true;
                        }}
                        action={url.loginAction}
                        method="post"
                    >
                        <div className="login-input-group">
                            {!usernameHidden && (
                                <input
                                    tabIndex={2}
                                    id="username"
                                    className="login-input"
                                    name="username"
                                    defaultValue={login.username ?? ""}
                                    type="text"
                                    autoFocus
                                    autoComplete="username"
                                    aria-invalid={messagesPerField.existsError("username", "password")}
                                    placeholder="Email address"
                                />
                            )}
                            {realm.password && (
                                <input
                                    tabIndex={3}
                                    id="password"
                                    className="login-input"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    aria-invalid={messagesPerField.existsError("username", "password")}
                                    placeholder="Password"
                                />
                            )}
                        </div>

                        <div id="kc-form-options">
                            {realm.rememberMe && !usernameHidden && (
                                <div className="checkbox">
                                    <label>
                                        <input tabIndex={5} id="rememberMe" name="rememberMe" type="checkbox" defaultChecked={!!login.rememberMe} />{" "}
                                        Remember me
                                    </label>
                                </div>
                            )}
                        </div>

                        <div id="kc-form-buttons">
                            <input type="hidden" id="id-hidden-input" name="credentialId" value={auth?.selectedCredential} />
                            <button className="login-button" name="login" id="kc-login" type="submit" disabled={isLoginButtonDisabled}>
                                Sign In
                            </button>
                        </div>

                        {realm.resetPasswordAllowed && (
                            <div className="signup-link">
                                <a href={url.loginResetCredentialsUrl} className="signup-link-text">
                                    Forgot Password?
                                </a>
                            </div>
                        )}

                        {realm.registrationAllowed && !registrationDisabled && (
                            <div className="signup-link">
                                <span className="signup-text">Don&apos;t have an account? </span>
                                <a href={url.registrationUrl} className="signup-link-text">
                                    Sign up
                                </a>
                            </div>
                        )}

                        {social?.providers && social.providers.length > 0 && (
                            <>
                                <div className="divider-container">
                                    <div className="divider-line"></div>
                                    <div className="divider-text">OR</div>
                                    <div className="divider-line"></div>
                                </div>

                                <div className="social-providers">
                                    {social.providers.map(p => (
                                        <a key={p.alias} href={p.loginUrl} className="social-button">
                                            <div className="social-icon">
                                                <div className="apple-icon"></div>
                                            </div>
                                            <span className="social-text">Continue with {p.displayName}</span>
                                        </a>
                                    ))}
                                </div>
                            </>
                        )}
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
