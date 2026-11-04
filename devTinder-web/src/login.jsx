const Login = () => {
  return (
    <div className="flex  justify-center m-10">
      <div className="card bg-base-300 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Login</h2>
    <fieldset className="fieldset">
  <legend className="fieldset-legend">Email ID</legend>
  <input type="text" className="input" placeholder="Type here" />
</fieldset>
    <fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
  <input type="password" className="input" placeholder="Type here" />
</fieldset>
    <div className="card-actions justify-center">
      <button className="btn btn-primary">Login</button>
    </div>
  </div>
</div>
    </div>
  );
};

export default Login;