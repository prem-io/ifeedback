import { Button, Code, Text, Heading } from '@chakra-ui/core';
import Head from 'next/head';
import { useAuth } from '@/lib/auth';

export default function Home() {
  const auth = useAuth();

  return (
    <div>
      <Head>
        <title>Feedback.io</title>
      </Head>

      <main>
        <Heading>Feedback.io</Heading>

        <Text>
          Current user:
          <Code>{auth.user ? auth.user.name : 'Guest'}</Code>
        </Text>

        {auth.user ? (
          <Button onClick={() => auth.signout()}>Sign Out</Button>
        ) : (
          <Button onClick={() => auth.signinWithGitHub()}>Sign In</Button>
        )}
      </main>
    </div>
  );
}
