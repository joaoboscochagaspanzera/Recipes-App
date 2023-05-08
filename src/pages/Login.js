function Login() {
  return (
    <>
      <h1>Login</h1>
      <input
        data-testid="email-input"
        type="email"
      />
      <input
        data-testid="password-input"
        type="password"
      />
      <button
        data-testid="login-submit-btn"
      >
        ENTER
      </button>
    </>
  );
}

export { Login };
