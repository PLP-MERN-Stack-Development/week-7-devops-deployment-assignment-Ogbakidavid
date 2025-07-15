import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import API from "../services/api";
import { Link } from "react-router-dom"
import { toast } from "sonner";


export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            toast.error("All fields required");
            return;
        }
        setLoading(true);
        
        try {
            const res = await API.post("/auth/signup", { username, email, password });
            
            if (!res.data?.token) {
                alert("Signup failed: No token received from the server");
                return;
            }

            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
            toast.success("Signup successful");
            // setUsername("");
            // setEmail("");
            // setPassword("");

        } catch (err) {
            alert(err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
            <Card className="w-full max-w-md shadow-xl animate-fade">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Sign Up</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSignup} disabled={loading} className="w-full">
                        {loading ? "Signing up..." : "Sign Up"}
                    </Button>
                </CardFooter>
                <p className="text-sm text-center text-zinc-600 dark:text-zinc-300 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </Card>
        </div>
    );
}