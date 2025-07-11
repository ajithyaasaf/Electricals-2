import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { signInWithGoogle } from "@/lib/auth";
import { getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { Mail, Lock, User } from "lucide-react";

export default function Login() {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    // Handle redirect result from Google sign-in
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const user = result.user;
          
          toast({
            title: "Welcome to CopperBear!",
            description: `Successfully signed in as ${user.displayName || user.email}`,
          });
          
          setLocation("/");
        }
      } catch (error: any) {
        toast({
          title: "Sign-in failed",
          description: error.message || "An error occurred during sign-in",
          variant: "destructive",
        });
      }
    };

    handleRedirectResult();
  }, [toast, setLocation]);

  useEffect(() => {
    if (user && !loading) {
      setLocation("/");
    }
  }, [user, loading, setLocation]);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error: any) {
      toast({
        title: "Sign-in failed",
        description: error.message || "An error occurred during sign-in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Note: Email/password authentication would be implemented here
    // For now, we'll show a message to use Google sign-in
    toast({
      title: "Feature coming soon",
      description: "Please use Google sign-in for now. Email/password authentication will be available soon.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-copper"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-copper rounded-lg flex items-center justify-center mr-3">
              <i className="fas fa-bolt text-white text-xl"></i>
            </div>
            <span className="font-montserrat font-bold text-2xl text-deep-gray">CopperBear</span>
          </div>
          <CardTitle className="font-montserrat font-bold text-2xl text-deep-gray">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </CardTitle>
          <p className="text-gray-600">
            {isSignUp 
              ? "Join CopperBear for quality electrical solutions"
              : "Sign in to your CopperBear account"
            }
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Google Sign-In Button */}
          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            variant="outline"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-copper mr-2"></div>
            ) : (
              <i className="fab fa-google text-lg mr-2"></i>
            )}
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Full Name
                </Label>
                <div className="mt-1 relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="pl-10 focus:ring-2 focus:ring-copper focus:border-transparent"
                    placeholder="Enter your full name"
                    required={isSignUp}
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address
              </Label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="pl-10 focus:ring-2 focus:ring-copper focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="pl-10 focus:ring-2 focus:ring-copper focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-copper hover:bg-copper-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-gray-600">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-copper hover:text-copper-dark font-semibold transition-colors"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>
              By signing in, you agree to our{" "}
              <Link href="/terms" className="text-copper hover:text-copper-dark">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-copper hover:text-copper-dark">
                Privacy Policy
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
