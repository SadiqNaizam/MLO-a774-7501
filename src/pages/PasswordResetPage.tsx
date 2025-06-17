import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';

import Header from '../components/layout/Header'; // Custom component
import Footer from '../components/layout/Footer'; // Custom component
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const passwordResetSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  token: z.string().min(1, { message: "Token is required."}) // Ensure token is present
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;

const PasswordResetPage: React.FC = () => {
  console.log('PasswordResetPage loaded');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenFromUrl, setTokenFromUrl] = useState<string | null>(null);

  const form = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      token: '',
    },
  });

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setTokenFromUrl(token);
      form.setValue('token', token);
    } else {
      setError("No password reset token found. Please request a new password reset link.");
      // Disable form or redirect if no token
    }
  }, [searchParams, form]);

  const onSubmit = async (data: PasswordResetFormValues) => {
    setIsLoading(true);
    setError(null);

    if (!data.token) {
        setError("Password reset token is missing. Cannot proceed.");
        setIsLoading(false);
        return;
    }

    console.log('Password reset attempt:', { email: 'unknown (token based)', token: data.token }); // Email not directly available here

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate success/failure
    // In a real app, you would make an API call here with data.password and data.token
    const isSuccess = Math.random() > 0.2; // Simulate 80% success rate

    if (isSuccess) {
      toast.success("Password has been reset successfully!", {
        description: "You can now log in with your new password.",
      });
      navigate('/'); // Navigate to LoginPage as per App.tsx
    } else {
      setError("Failed to reset password. The token might be invalid, expired, or an unexpected error occurred.");
      toast.error("Password Reset Failed", {
        description: "Please try again or request a new reset link.",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
              Set New Password
            </CardTitle>
            <CardDescription className="mt-2 text-gray-600 dark:text-gray-300">
              Please enter your new password below. Make sure it's strong and secure.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {!tokenFromUrl && !error && ( // Show only if token is missing and no other error has been set
                 <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Missing Token</AlertTitle>
                    <AlertDescription>
                        A password reset token is required. If you followed a link from your email, it might be incomplete.
                        Please <Link to="/forgot-password" className="font-medium text-primary hover:underline">request a new password reset link</Link>.
                    </AlertDescription>
                </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">New Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          disabled={isLoading || !tokenFromUrl}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="confirmPassword">Confirm New Password</FormLabel>
                      <FormControl>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          disabled={isLoading || !tokenFromUrl}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => ( // Hidden field for token, mainly for validation schema
                    <FormItem className="hidden">
                      <FormLabel>Token</FormLabel>
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading || !tokenFromUrl}>
                  {isLoading ? 'Resetting Password...' : 'Set New Password'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-center text-sm">
            <p className="text-gray-600 dark:text-gray-400">Remembered your password or need help?</p>
            <Link to="/" className="font-medium text-primary hover:underline dark:text-blue-400">
              Back to Login
            </Link>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PasswordResetPage;