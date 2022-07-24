import { Text, Button, SimpleGrid, Box, Flex, Spinner } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { AppContext } from '../context/AppContext';
import { validateMembership } from '../utils/web3';

export default function Home() {
  const context = useContext(AppContext);
  const router = useRouter();
  const [accountValidated, setAccountValidated] = useState(false);

  const checkMembership = async () => {
    const isMember = await validateMembership(context.signerAddress);
    context.setWeb3Data({ isMember });
    setAccountValidated(true);
  };

  useEffect(() => {
    context.signerAddress && checkMembership();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.signerAddress]);

  return (
    <SimpleGrid
      columns={{ lg: 2, sm: 1 }}
      w='80%'
      spacing='1rem'
      alignItems='center'
    >
      {!context.signerAddress && (
        <Flex direction='column' alignItems='center' m='auto' color='white'>
          <Box fontSize='40px'>
            <i className='fa-solid fa-compass'></i>
          </Box>
          <Text textAlign='center' maxW='500px' fontFamily='spaceMono'>
            Connect your wallet to enable more portals (RaidGuild Membership
            Required).
          </Text>
        </Flex>
      )}

      {context.signerAddress && !accountValidated && (
        <Flex direction='column' alignItems='center' m='auto' color='white'>
          <Box fontSize='40px'>
            <Spinner color='red' />
          </Box>
          <Text textAlign='center' maxW='500px' fontFamily='spaceMono'>
            Validating your account type..
          </Text>
        </Flex>
      )}

      {accountValidated && (
        <Flex direction='column' alignItems='center' m='auto' color='white'>
          <Box fontSize='40px'>
            <i
              className={
                context.isMember ? 'fa-solid fa-lock-open' : 'fa-solid fa-lock'
              }
            ></i>
          </Box>
          <Text textAlign='center' maxW='500px' fontFamily='spaceMono'>
            {context.isMember ? 'You are a member.' : 'You are not a member.'}
          </Text>
        </Flex>
      )}

      <Flex
        direction='column'
        fontFamily='spaceMono'
        fontSize='18px'
        alignItems='center'
        justifyContent='space-between'
        px='1rem'
        h='300px'
      >
        <Button
          w='100%'
          justifyContent='flex-start'
          bg='red'
          onClick={() => router.push('/bids')}
        >
          <Box mr='1rem'>
            <i className='fa-solid fa-dungeon'></i>
          </Box>
          To the consultation queue
        </Button>
        <Button
          w='100%'
          justifyContent='flex-start'
          isDisabled={!context.isMember}
          bg={context.isMember ? 'red' : 'greyLight'}
          onClick={() => router.push('/consultations')}
        >
          <Box mr='1rem'>
            <i className='fa-solid fa-dungeon'></i>
          </Box>
          To the consultations
        </Button>
        <Button
          w='100%'
          justifyContent='flex-start'
          isDisabled={!context.isMember}
          bg={context.isMember ? 'red' : 'greyLight'}
          onClick={() => router.push('/raids')}
        >
          <Box mr='1rem'>
            <i className='fa-solid fa-dungeon'></i>
          </Box>
          To the raids
        </Button>
        <Button
          w='100%'
          justifyContent='flex-start'
          isDisabled={!context.isMember}
          bg={context.isMember ? 'red' : 'greyLight'}
          onClick={() => router.push('/members')}
        >
          <Box mr='1rem'>
            <i className='fa-solid fa-dungeon'></i>
          </Box>
          To the members
        </Button>
      </Flex>
    </SimpleGrid>
  );
}
