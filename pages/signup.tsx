import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import MainLayout from '../components/layout/MainLayout';
import RegisterForm from '../components/RegisterForm';

export default function Signup() {
  const router = useRouter();
  // GraphQL register form handles submit + redirects

  return (
    <MainLayout title="Create your ConnectU account" className="bg-gray-50 dark:bg-slate-900" publicPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto py-16">
          <h1 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-8">Sign up</h1>
          <div className="p-8 space-y-6 bg-white rounded-xl border border-gray-200 dark:bg-slate-900 dark:border-slate-800">
            <RegisterForm />

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">Already have an account? <Link href="/login" className="text-primary-600 hover:text-primary-700">Log in</Link></p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
