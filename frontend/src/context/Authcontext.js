import {createContext, useState, useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

const swal = require('sweetalert2')

const AuthContext = createContext();

export default AuthContext

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    

    const [user, setUser] = useState(() => 
        localStorage.getItem("authTokens")
            ? jwtDecode(localStorage.getItem("authTokens"))
            : null
    );


    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (authTokens) {
            localStorage.setItem('authTokens', JSON.stringify(authTokens));
        } else {
            localStorage.removeItem('authTokens');
        }
    }, [authTokens]);

    const loginUser = async (email, password) => {
        // Placeholder: replace with your actual fetch request to login endpoint
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            swal.fire({
                title: 'Success!',
                text: 'OTP has been sent to your email.',
                icon: 'success',
                toast: true,
                timer: 3000,
                position: 'top-right',
                showConfirmButton: false,
                timerProgressBar: true
            })
            // Assuming the OTP is sent successfully, redirect to OTP input page
            navigate('/otp-verify', { state: { email } });
        } else {
            // Handle errors
            swal.fire({
                title: 'Error!',
                text: data.detail || 'Invalid credentials',
                icon: 'error',
                toast: true,
                timer: 3000,
                position: 'top-right',
                showConfirmButton: false,
                timerProgressBar: true
                
            })
            console.error('Login Failed:', data);
        }
    };
    const verifyOtp = async (email, otp) => {
        const response = await fetch('http://127.0.0.1:8000/api/verify-otp/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        });
        const data = await response.json();
        if (response.ok) {
            setAuthTokens(data);
            swal.fire({
                title: 'Success!',
                text: 'OTP verification successful. You are now logged in.',
                icon: 'success',
                toast: true,
                timer: 3000,
                position: 'top-right',
                showConfirmButton: false,
                timerProgressBar: true
            });
            navigate('/');
        } else {
            swal.fire({
                title: 'Error!',
                text: data.error || 'Invalid OTP',
                icon: 'error',
                toast: true,
                timer: 3000,
                position: 'top-right',
                showConfirmButton: false,
                timerProgressBar: true
            });
        }
    };
    


    const registerUser = async (email, username, password, password2) => {
        const response = await fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, username, password, password2
            })
        })
        const data = await response.json();
        if(response.ok){
            navigate("/login")
            swal.fire({
                title: "Registration Successful, Login Now",
                icon: "success",
                toast: true,
                timer: 4000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        } else {
            // This will construct an error message from the server's response if available
            const errorMessage = data.email?.join(' ') || data.username?.join(' ') || "An unknown error occurred. Please try again.";
            throw new Error(errorMessage);
        }
    }

 
    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        console.log("Logged Out");
        navigate("/login")
        swal.fire({
            title: "You have been logged out...",
            icon: "success",
            toast: true,
            timer: 4000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        })
    }

    const makeBid = async (product_id, bidAmount) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/bids/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authTokens.access}`
                },
                body: JSON.stringify({ product: product_id, bid: bidAmount })
            });
            if (response.status === 201) {
                swal.fire({
                  title: "Bid Successfully Placed",
                  width: 600,
                  text: "Your bid has been successfully placed.",
                  icon: "success",
                  toast: true,
                  position: 'center',
                  timerProgressBar: false,
                  showConfirmButton: true,
                }).then(() => {
                    navigate("/dashboard")
                  window.location.reload(); // Reload the page
                });
            } else {
                console.log("Failed to place bid");
                swal.fire({
                    title: "Failed to Place Bid",
                    icon: "error",
                    toast: true,
                    position: 'top-right',
                    timer: 4000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                });


            }
        } catch (error) {
            console.error("Error placing bid:", error);
        }
    };
    

    


    const contextData = {
        user, 
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
        makeBid,
        verifyOtp,
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access))
        }
        setLoading(false)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

}