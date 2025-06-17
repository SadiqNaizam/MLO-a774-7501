import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header'; // Custom component
import Footer from '@/components/layout/Footer'; // Custom component
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'; // shadcn/ui
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'; // shadcn/ui
import { LayoutDashboard, Settings, LogOut } from 'lucide-react'; // Icons

const DashboardPage: React.FC = () => {
  console.log('DashboardPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Header />
      <div className="flex flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sidebar Navigation */}
        <aside className="w-60 pr-8">
          <NavigationMenu orientation="vertical" className="w-full">
            <NavigationMenuList className="flex flex-col space-y-1 w-full">
              <NavigationMenuItem className="w-full">
                <Link to="/dashboard" className="w-full">
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} w-full justify-start bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-foreground`} // Active-like styling
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link to="/settings" className="w-full"> {/* Placeholder route, will go to NotFound as per App.tsx */}
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800`}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link to="/" className="w-full"> {/* Logout to LoginPage (path="/") */}
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800`}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          <Card className="shadow-lg border dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Welcome to Your Dashboard
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 pt-1">
                You have successfully logged in. This is your main application area.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                From here, you can manage your account, view application-specific data,
                and access various features tailored to your needs.
              </p>
              {/* Example placeholder content for a generic dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg shadow">
                  <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">Account Overview</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    View your profile information, recent activity, and manage your preferences.
                  </p>
                  <Link to="/settings"> {/* Placeholder */}
                    <button className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                      Go to Settings
                    </button>
                  </Link>
                </div>
                <div className="p-6 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg shadow">
                  <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">Explore Features</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Discover the key functionalities and tools available in this application.
                  </p>
                   <button className="mt-4 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                      Learn More
                    </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;