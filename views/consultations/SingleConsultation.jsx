/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
  Grid,
  GridItem,
  VStack,
  Text,
  Tag,
  Divider,
  UnorderedList,
  ListItem,
  Button
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { getQueuedBids } from '../../utils/requests';

export const SingleConsultation = ({ consultation }) => {
  const [bidStatus, setBidStatus] = useState(null);

  const consultationStatus =
    consultation.consultation_hash === 'cancelled'
      ? 'cancelled'
      : consultation.consultation_hash
      ? 'completed'
      : 'pending';

  const checkForBids = async () => {
    const { bids } = await getQueuedBids(consultation.submission_hash);
    if (bids.length > 0) {
      setBidStatus(bids[0].status);
    }
  };

  useEffect(() => {
    if (consultationStatus === 'pending' && consultation.submission_hash) {
      checkForBids();
    }
  }, []);

  return (
    <Grid
      w='100%'
      h='100%'
      templateColumns='repeat(5, 1fr)'
      templateRows='repeat(2, 1fr)'
      fontFamily='spaceMono'
      my='2rem'
      gap={5}
    >
      <GridItem colSpan={4} rowSpan={1} bg='blackLight'>
        <Text fontFamily='rubik' bg='red' color='black' p='1rem'>
          Project Info
        </Text>
        <VStack alignItems='flex-start' p='2rem'>
          <Flex
            direction='column'
            justifyContent='space-between'
            alignItems='flex-start'
            mb='.5rem'
          >
            <Text color='red' fontWeight='bold' mb='5px' fontSize='xl'>
              {consultation.project_name}
            </Text>

            <Flex direction='row'>
              <Tag
                mr='5px'
                bg='blackDark'
                color='white'
                fontWeight='bold'
                size='sm'
              >
                <Text fontFamily='jetbrains'>
                  <i className='fa-solid fa-dollar-sign'></i>{' '}
                  {consultation.budget}
                </Text>
              </Tag>
              <Tag
                mr='5px'
                bg='blackDark'
                color='white'
                fontWeight='bold'
                size='sm'
              >
                {consultation.project_type}
              </Tag>
              <Tag
                mr='5px'
                bg={
                  consultation.submission_type === 'paid' ? 'red' : 'blackDark'
                }
                cursor={consultation.submission_type === 'paid' && 'pointer'}
                size='sm'
                onClick={() =>
                  consultation.submission_hash &&
                  window.open(
                    `https://etherscan.io/tx/${consultation.submission_hash}`
                  )
                }
                color='white'
                fontWeight='bold'
              >
                {consultation.submission_type}
              </Tag>
              <Tag bg='blackDark' color='white' fontWeight='bold' size='sm'>
                {consultation.delivery_priorities}
              </Tag>
            </Flex>
          </Flex>

          <Flex direction='column' color='white' fontSize='sm' maxW='100%'>
            <Text maxH='200px' overflowY='scroll' mb='2rem'>
              {consultation.project_desc}
            </Text>
          </Flex>
          <Divider />
          <Flex direction='column'>
            <Text
              mt='2rem'
              mb='.5rem'
              fontFamily='spaceMono'
              color='purpleLight'
            >
              Required Services
            </Text>
            <UnorderedList>
              {consultation.services_req.map((service, index) => {
                return (
                  <ListItem key={index} color='white' fontSize='sm'>
                    {service}
                  </ListItem>
                );
              })}
            </UnorderedList>
          </Flex>
        </VStack>
      </GridItem>

      <GridItem colSpan={4} rowSpan={1} bg='blackLight'>
        <Text bg='red' color='black' p='1rem' fontFamily='rubik'>
          Client Info
        </Text>
        <VStack alignItems='flex-start' p='2rem'>
          <Flex
            direction='column'
            justifyContent='space-between'
            alignItems='flex-start'
            mb='.5rem'
          >
            <Text color='white' fontWeight='bold' fontSize='xl' mb='5px'>
              {consultation.contact_name}
            </Text>

            <Flex direction='row'>
              {consultation.contact_email && (
                <Tag mr='5px' bg='blackDark' color='white' size='sm'>
                  {consultation.contact_email}
                </Tag>
              )}
              {consultation.contact_telegram && (
                <Tag mr='5px' bg='blackDark' color='white' size='sm'>
                  {consultation.contact_telegram}
                </Tag>
              )}
              {consultation.contact_discord && (
                <Tag bg='blackDark' color='white' size='sm'>
                  {consultation.contact_discord}
                </Tag>
              )}
            </Flex>
          </Flex>

          <Flex direction='column' color='white' fontSize='sm'>
            <Text maxW='100%' mb='2rem'>
              {consultation.contact_bio}
            </Text>
          </Flex>
          <Divider />
          <Flex direction='column'>
            <Text
              mb='.5rem'
              fontFamily='spaceMono'
              color='purpleLight'
              mt='2rem'
            >
              Additional Info
            </Text>
            <Text color='white' fontSize='sm' maxW='100%'>
              {consultation.additional_info}
            </Text>
          </Flex>
        </VStack>
      </GridItem>

      <GridItem colStart={5} rowStart={1} rowEnd={2} spacing='10px'>
        <VStack bg='blackLight' p='1rem' mb='1rem'>
          <Text color='red'>Cleric</Text>
          <Text color='white'>
            {consultation.raid && consultation.raid.cleric
              ? consultation.raid.cleric.name
              : 'NaN'}
          </Text>
        </VStack>

        {consultationStatus !== 'pending' && (
          <Text color='purple' textTransform='uppercase' fontWeight='bold'>
            consultation {consultationStatus}
          </Text>
        )}

        {bidStatus !== 'queued' && consultationStatus === 'pending' && (
          <VStack>
            <Button
              bg='red'
              w='100%'
              _hover={{
                opacity: '0.8'
              }}
            >
              <i className='fa-solid fa-campground'></i>
              <Text ml='5px'>Promote</Text>
            </Button>
            <Button
              border='2px solid'
              borderColor='red'
              color='red'
              w='100%'
              mb='1rem'
              _hover={{
                opacity: '0.8'
              }}
            >
              <i className='fa-solid fa-ban'></i>
              <Text ml='5px'>Cancel</Text>
            </Button>
          </VStack>
        )}
      </GridItem>
    </Grid>
  );
};
