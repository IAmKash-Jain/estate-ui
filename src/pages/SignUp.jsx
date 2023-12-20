/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom"

export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value
      }
    )
    //console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data;
    await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then(async (res) => {
      data = await res.json();
      if (!data.success) {
        //console.log(data);
        setLoading(false);
        setError(data.customMessage + " : " + data.message);
      }else{
        setLoading(false);
        setError(null);
        navigate('/sign-in');
      }
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="username" className="border p-3 rounded-lg" id="username" onChange={handleChange} />
        <input type="email" placeholder="email" className="border p-3 rounded-lg" id="email" onChange={handleChange} />
        <input type="password" placeholder="password" className="border p-3 rounded-lg" id="password" onChange={handleChange} />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-3 mt-5">
        <p>Already have account ?</p>
        <Link to={'/sign-in'}>
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {
        error &&
        <p className="text-red-500 mt-5">
          {error}
        </p>
      }
    </div>
  )
}
