import { useMutation, gql } from "@apollo/client";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { saveTokens } from "@/lib/auth-tokens";

const LOGIN_MUTATION = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      refreshToken
      success
      errors
      user {
        id
        username
        email
      }
    }
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const [doLogin] = useMutation(LOGIN_MUTATION, {
    errorPolicy: 'all',
    onCompleted: (data: any) => {
      const res = data?.tokenAuth;
      if (res?.success && res?.token) {
        saveTokens(res.token, res.refreshToken);
        router.push('/home');
        return;
      }
      const msg = typeof res?.errors === 'string' ? res.errors : 'Invalid credentials or account not active.';
      setServerError(msg);
      setIsLoading(false);
    },
    onError: (e: any) => {
