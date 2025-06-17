import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header'; // Custom component
import Footer from '@/components/layout/Footer'; // Custom component
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from 'lucide-react'; // Icon for success alert

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  console.log('ForgotPasswordPage loaded');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null); // Clear previous messages
    console.log('Password reset requested for:', email);

    // Simulate API call for password reset
    // In a real application, you would call your backend API here.
    // For now, we'll just display a success message.
    setTimeout(() => {
      setMessage({
        text: "If an account with that email address exists, a password reset link has been sent.",
        type: 'success',
      });
      // setEmail(''); // Optionally clear the email field
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow flex items-center justify-center p-6 sm:p-8">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Forgot Password?</CardTitle>
            <CardDescription className="pt-2">
              Enter your email address below and we'll send you instructions to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {message && (
                <Alert variant={message.type === 'success' ? 'default' : 'destructive'} className="flex items-start">
                  {message.type === 'success' && <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-green-500" />}
                  {/* Add an error icon here if you implement error messages e.g. <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 text-red-500" /> */}
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full text-base py-3">
                Send Reset Instructions
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center pt-4">
            <p className="text-sm text-muted-foreground">
              Remembered your password?{' '}
              <Link to="/" className="font-medium text-primary hover:underline dark:text-primary-hover">
                Back to Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;