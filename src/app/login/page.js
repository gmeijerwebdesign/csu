import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src="/unnamed.png" className="max-w-[200px]" />
      <div className="flex flex-col items-center py-5 text-[#595959]">
        <p className="bold tracking-wider">CSU | Scherp op schoon</p>
        <p>inlogscherm</p>
      </div>
      <form className="flex flex-col gap-4 items-center">
        <input
          id="email"
          name="email"
          type="email"
          className="auth-input-bar"
          placeholder="email"
          required
        />

        <input
          id="password"
          name="password"
          type="password"
          className="auth-input-bar"
          placeholder="wachtwoord"
          required
        />
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          <span className="text-[14px] font-medium text-[#403c3c]">
            aangemeld blijven
          </span>
        </label>
        <p className="text-[12px] text-blue-700">Wachtwoord vergeten?</p>
        <button className="custom-button" formAction={login}>
          Log in
        </button>
        {/* <button className="custom-button" formAction={signup}>
          Sign up
        </button> */}
      </form>
    </div>
  );
}
