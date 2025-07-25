import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import API from "../services/api";
import { Link } from "react-router-dom"
import { toast } from "sonner";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("All fields required");
            return 
        }
        setLoading(true);
        try {
            const res = await API.post("/auth/login", { email, password });
            
            if (!res.data?.token) {
                toast.error("Login failed: No token received from the server");
                return;
            }

            try {
                localStorage.setItem("token", res.data.token);
            } catch {
                toast.error("Failed to store token in local storage");
                return;
            }

            
            toast.success("Login successful");
            navigate("/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
            <Card className="w-full max-w-md shadow-xl animate-fade">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Log In</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                <CardFooter className="flex justify-between">
                    <Button onClick={handleLogin} disabled={loading} className="w-full">
                        {loading ? "Logging in..." : "Log In"}
                    </Button>
                </CardFooter>

                <p className="text-sm text-center text-zinc-600 dark:text-zinc-300 mt-4">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </Card>
        </div>
    );
}