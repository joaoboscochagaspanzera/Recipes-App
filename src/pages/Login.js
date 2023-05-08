function Login() {
  return (
    <>
      <h1>Login</h1>
      <input
        data-testid="email-input"
      />
      <input
        data-testid="password-input"
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
