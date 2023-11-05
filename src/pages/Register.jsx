import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from '../hooks/useRegister';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, error, loading } = useRegister();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emptyFields, setEmptyFields] = useState({
    email: false,
    name: false,
    password: false,
    confirmPassword: false,
  });
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEmptyFields = {
      email: !email,
      name: !name,
      password: !password,
      confirmPassword: !confirmPassword,
    };

    setEmptyFields(newEmptyFields);

    if (Object.values(newEmptyFields).some((field) => field)) {
      toast.error('All fields must be filled');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const result = await register(email, password, name);
      if (result.success) {
        toast.success('Registration Successful');
      } else {
        toast.error(error);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Register for an account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="field-container">
                <label htmlFor="name" className={`block mb-2 text-sm font-medium text-gray-900 ${emptyFields.name ? 'text-red-500' : ''}`}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${emptyFields.name ? 'border-red-500' : ''}`}
                  required
                />
                {emptyFields.name && <p className="text-sm text-red-500">Field must be filled</p>}
              </div>
              <div className="field-container">
                <label htmlFor="email" className={`block mb-2 text-sm font-medium text-gray-900 ${emptyFields.email ? 'text-red-500' : ''}`}>Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${emptyFields.email ? 'border-red-500' : ''}`}
                  required
                />
                {emptyFields.email && <p className="text-sm text-red-500">Field must be filled</p>}
              </div>

              <div className="field-container">
                <label htmlFor="password" className={`block mb-2 text-sm font-medium text-gray-900 ${emptyFields.password ? "text-red-500" : ""}`}>
                  Password
                </label>
                <div className={`password-input flex items-center ${emptyFields.password ? "border-red-500" : ""}`}>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex-grow p-2.5"
                    required
                  />
                  <span className="password-toggle" onClick={togglePasswordVisibility}>
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {emptyFields.password && <p className="text-sm text-red-500">Field must be filled</p>}
              </div>

              <div className="field-container">
                <label htmlFor="confirmPassword" className={`block mb-2 text-sm font-medium text-gray-900 ${emptyFields.confirmPassword ? 'text-red-500' : ''}`}>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${emptyFields.confirmPassword ? 'border-red-500' : ''}`}
                  required
                />
                {emptyFields.confirmPassword && <p className="text-sm text-red-500">Field must be filled</p>}
              </div>
              <button disabled={loading} type="submit" className="w-full text-white bg-slate-800 hover-bg-primary-700 focus-ring-4 focus-outline-none focus-ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Register</button>
              {error && <p className="text-sm font-medium text-red-500">{error}</p>}
              <p className="text-sm font-light text-gray-600" >
                Already have an account? <Link to="/login" className="font-medium text-slate-500 hover-underline ">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
