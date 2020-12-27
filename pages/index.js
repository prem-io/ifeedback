import React from 'react';
import Head from 'next/head';
import { Button, Heading, Icon, Flex } from '@chakra-ui/core';
import { useAuth } from '@/lib/auth';

const HomePage = () => {
  const auth = useAuth();
  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      w="100vw"
      h="100vh"
    >
      <Head>
        <title>Feedback.io</title>
      </Head>

      <Heading>Feedback.io</Heading>
      <Icon name="logo" color="black" size="64px" />

      {auth.user ? (
        <Button onClick={() => auth.signout()}>Sign Out</Button>
      ) : (
        <Button onClick={() => auth.signinWithGitHub()}>Sign In</Button>
      )}
    </Flex>
  );
};

export default HomePage;
