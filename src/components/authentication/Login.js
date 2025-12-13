// import React, { useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { GoogleLogin } from "@react-oauth/google";
// import { toast } from "react-toastify";
// import { ROUTES } from "../../routes/RouterConstant";
// import { loginUser, loginWithGoogle } from "../../redux/action/authAction/AuthAction";

// const Login = ({ setScreen }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   // Only get isLoading - don't track error in component
//   const { isLoading } = useSelector((state) => state.auth);
  
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   });
//   const [validationErrors, setValidationErrors] = useState({});

//   const handleInputChange = useCallback((e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
    
//     // Only clear validation errors for the specific field
//     if (validationErrors[name]) {
//       setValidationErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   }, [validationErrors]);

//   const validateForm = useCallback(() => {
//     const errors = {};
    
//     if (!formData.email.trim()) {
//       errors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       errors.email = "Please enter a valid email";
//     }
    
//     if (!formData.password) {
//       errors.password = "Password is required";
//     } else if (formData.password.length < 8) {
//       errors.password = "Password must be at least 8 characters";
//     }
    
//     return errors;
//   }, [formData.email, formData.password]);

//   const handleForget = useCallback(() => {
//     setScreen("forgot");
//     navigate(ROUTES.FORGET_PASSWORD);
//   }, [setScreen, navigate]);

//   const handleSubmit = useCallback(async (e) => {
//     e.preventDefault();
    
//     // Clear only validation errors
//     setValidationErrors({});
    
//     // Validate form
//     const errors = validateForm();
//     if (Object.keys(errors).length > 0) {
//       setValidationErrors(errors);
//       return;
//     }
    
//     try {
//       const response = await dispatch(loginUser(formData.email, formData.password));
      
//       // Show success toast
//       toast.success(`Welcome back, ${response.user.name}!`, {
//         autoClose: 3000,
//       });
      
//       // Navigate to dashboard on success
//       navigate(ROUTES.DASHBOARD);
//     } catch (error) {
//       // Show error toast - this is independent of component state
//       const errorMessage = error.response?.data?.message || error.message || "Login failed";
      
//       // Use toast.error with a unique toastId to prevent duplicates
//       toast.error(errorMessage, {
//         toastId: 'login-error', // Prevents duplicate toasts
//         autoClose: 5000,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     }
//   }, [dispatch, formData.email, formData.password, navigate, validateForm]);

//   const handleGoogleSuccess = useCallback(async (credentialResponse) => {
//     try {
//       const response = await dispatch(loginWithGoogle(credentialResponse.credential));
      
//       // Show success toast
//       toast.success(`Welcome back, ${response.user.name}!`, {
//         autoClose: 3000,
//       });
      
//       // Navigate to dashboard on success
//       navigate(ROUTES.DASHBOARD);
//     } catch (error) {
//       // Show error toast
//       const errorMessage = error.response?.data?.message || error.message || "Google login failed";
      
//       toast.error(errorMessage, {
//         toastId: 'google-login-error',
//         autoClose: 5000,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     }
//   }, [dispatch, navigate]);

//   const handleGoogleError = useCallback(() => {
//     toast.error("Google login failed. Please try again.", {
//       toastId: 'google-error',
//       autoClose: 5000,
//     });
//   }, []);

//   return (
//     <div className="w-full max-w-md mx-auto p-4 md:p-6">
//       <div className="mb-6">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
//           Welcome Back
//         </h2>
//         <p className="text-gray-600 text-sm md:text-base">
//           Sign in to continue to your account
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1.5">
//             Email Address
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             placeholder="Enter your email"
//             className={`w-full px-4 py-2.5 md:py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none text-sm md:text-base ${
//               validationErrors.email ? "border-red-500" : "border-gray-300"
//             }`}
//             disabled={isLoading}
//           />
//           {validationErrors.email && (
//             <p className="mt-1 text-xs text-red-600">{validationErrors.email}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1.5">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             placeholder="Enter your password"
//             className={`w-full px-4 py-2.5 md:py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none text-sm md:text-base ${
//               validationErrors.password ? "border-red-500" : "border-gray-300"
//             }`}
//             disabled={isLoading}
//           />
//           {validationErrors.password && (
//             <p className="mt-1 text-xs text-red-600">{validationErrors.password}</p>
//           )}
//         </div>

//         <div className="flex items-center justify-between">
//           <label className="flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               name="rememberMe"
//               checked={formData.rememberMe}
//               onChange={handleInputChange}
//               className="w-4 h-4 accent-[#3d97a9] cursor-pointer"
//               disabled={isLoading}
//             />
//             <span className="ml-2 text-xs md:text-sm text-gray-600">
//               Remember me
//             </span>
//           </label>
//           <button
//             type="button"
//             onClick={handleForget}
//             className="text-sm md:text-sm text-[#2fa8c8] font-medium hover:opacity-90 transition drop-shadow-lg"
//             disabled={isLoading}
//           >
//             Forgot Password?
//           </button>
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full bg-gradient-to-r from-[#518dcd] to-[#7ac0ca] text-white py-2.5 md:py-3 rounded-xl shadow-lg font-medium text-sm md:text-base hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isLoading ? "Logging in..." : "Log In"}
//         </button>
//       </form>

//       <div className="py-4">
//         <div className="flex items-center my-4">
//           <div className="flex-grow h-px bg-gray-300" />
//           <span className="px-3 text-xs text-gray-500 font-medium">OR</span>
//           <div className="flex-grow h-px bg-gray-300" />
//         </div>
        
//         <div className="flex justify-center">
//           <GoogleLogin
//             onSuccess={handleGoogleSuccess}
//             onError={handleGoogleError}
//             useOneTap
//             theme="outline"
//             size="large"
//             text="continue_with"
//             shape="rectangular"
//             width="100%"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// // Use React.memo to prevent unnecessary re-renders
// export default React.memo(Login);
















import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { ROUTES } from "../../routes/RouterConstant";
import { loginUser, loginWithGoogle } from "../../redux/action/authAction/AuthAction";

const Login = ({ setScreen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // CRITICAL: Only track isLoading, NOT error
  const isLoading = useSelector((state) => state.auth.isLoading);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [validationErrors, setValidationErrors] = useState({});

  // FIXED: Removed validationErrors from dependency array
  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Clear validation error for this specific field
    setValidationErrors((prev) => {
      if (prev[name]) {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      }
      return prev;
    });
  }, []); // Empty dependency array - function never recreated

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    
    return errors;
  };

  const handleForget = () => {
    setScreen("forgot");
    navigate(ROUTES.FORGET_PASSWORD);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear validation errors
    setValidationErrors({});
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    try {
      const response = await dispatch(loginUser(formData.email, formData.password));
      
      // Show success toast
      toast.success(`Welcome back, ${response.user.name}!`, {
        toastId: 'login-success',
        autoClose: 3000,
      });
      
      // Navigate to dashboard
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      // Show error toast
      const errorMessage = error.response?.data?.message || error.message || "Login failed";
      
      toast.error(errorMessage, {
        toastId: 'login-error',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await dispatch(loginWithGoogle(credentialResponse.credential));
      
      toast.success(`Welcome back, ${response.user.name}!`, {
        toastId: 'google-success',
        autoClose: 3000,
      });
      
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Google login failed";
      
      toast.error(errorMessage, {
        toastId: 'google-error',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleGoogleError = () => {
    toast.error("Google login failed. Please try again.", {
      toastId: 'google-error-btn',
      autoClose: 5000,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
          Welcome Back
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Sign in to continue to your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className={`w-full px-4 py-2.5 md:py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none text-sm md:text-base ${
              validationErrors.email ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
          />
          {validationErrors.email && (
            <p className="mt-1 text-xs text-red-600">{validationErrors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className={`w-full px-4 py-2.5 md:py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none text-sm md:text-base ${
              validationErrors.password ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
          />
          {validationErrors.password && (
            <p className="mt-1 text-xs text-red-600">{validationErrors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4 accent-[#3d97a9] cursor-pointer"
              disabled={isLoading}
            />
            <span className="ml-2 text-xs md:text-sm text-gray-600">
              Remember me
            </span>
          </label>
          <button
            type="button"
            onClick={handleForget}
            className="text-sm md:text-sm text-[#2fa8c8] font-medium hover:opacity-90 transition drop-shadow-lg"
            disabled={isLoading}
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-[#518dcd] to-[#7ac0ca] text-white py-2.5 md:py-3 rounded-xl shadow-lg font-medium text-sm md:text-base hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <div className="py-4">
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="px-3 text-xs text-gray-500 font-medium">OR</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>
        
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap={false}
            theme="outline"
            size="large"
            text="continue_with"
            shape="rectangular"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Login);