import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { signInSuccess, signInFailure } from "../redux/user/userSlice";

export default function OAuth() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleClicked = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            let data;
            await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ username : result.user.displayName, email: result.user.email, avatar: result.user.photoURL })
            }).then(async (res) => {
                data = await res.json();
                if (data.success) {
                    dispatch(signInSuccess(data.userData));
                    navigate('/');
                }
            }).catch((err) => {
                console.log(err);
                dispatch(signInFailure("Error : " + err.message));
            });
        } catch (err) {
            console.log("Could Not Login with Google : " + err.message);
        }
    }

    return (
        <button onClick={handleGoogleClicked} type="button" className="bg-red-700 p-3 rounded-lg uppercase text-white hover:opacity-80">Continue with Google</button>
    )
}
