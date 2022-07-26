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
  Button,
  Tooltip,
  Image,
  SimpleGrid,
  Textarea
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import { getQueuedBids } from '../../utils/requests';
import { getProfile } from '../../utils/3Box';

import { theme } from '../../styles/theme';

const StyledGrid = styled(Grid)`
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  font-family: ${theme.fonts.spaceMono};
  margin-bottom: 2rem;
  grid-gap: 1rem;
`;

const StyledCardTitle = styled(Text)`
  font-family: ${theme.fonts.rubik};
  background-color: ${theme.colors.red};
  color: ${theme.colors.black};
  padding: 1rem;
`;

const StyledStatusText = styled(Text)`
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  background-color: ${theme.colors.purple};
  padding: 10px;
  margin-bottom: 1rem;
`;

const StyledTag = styled(Tag)`
  margin-right: 5px;
  background-color: ${theme.colors.blackDark};
  color: ${theme.colors.white};
  font-weight: bold;
`;

const StyledLinkText = styled(Text)`
  width: 100%;
  text-align: center;
  font-weight: bold;
  color: ${theme.colors.red};
  text-decoration: underline;
  cursor: pointer;
  text-transform: uppercase;
  margin-top: 10px;
`;

const StyledDescriptionText = styled(Textarea)`
  width: 100%;
  min-height: 200px;
  color: white;
  border: none;
  border: 2px solid ${theme.colors.red};
`;

export const Consultation = ({ consultation }) => {
  const [bidStatus, setBidStatus] = useState(null);
  const [boxProfile, setBoxProfile] = useState(null);
  const {
    _id,
    contact_name,
    contact_email,
    contact_bio,
    contact_discord,
    contact_telegram,
    project_name,
    project_type,
    project_desc,
    services_req,
    budget,
    additional_info,
    submission_hash,
    consultation_hash,
    delivery_priorities,
    submission_type,
    raid
  } = consultation;

  const consultationStatus =
    consultation_hash === 'cancelled'
      ? 'cancelled'
      : consultation_hash
      ? 'completed'
      : 'pending';

  const checkForBids = async () => {
    const { bids } = await getQueuedBids(submission_hash);
    if (bids.length > 0) {
      setBidStatus(bids[0].status);
    }
  };

  const getBoxProfile = async () => {
    const profile = await getProfile(raid.cleric.eth_address);
    setBoxProfile(profile);
  };

  useEffect(() => {
    if (consultationStatus === 'pending' && submission_hash) {
      checkForBids();
    }
    if (raid && raid.cleric && raid.cleric.eth_address) {
      getBoxProfile();
    }
  }, []);

  return (
    <StyledGrid>
      <GridItem colSpan={4} rowSpan={1} bg='blackLight'>
        <StyledCardTitle>Project Info</StyledCardTitle>
        <VStack alignItems='flex-start' p='2rem'>
          <Flex
            direction='column'
            justifyContent='space-between'
            alignItems='flex-start'
            mb='.5rem'
          >
            <Text color='red' fontWeight='bold' mb='5px' fontSize='xl'>
              {project_name}
            </Text>

            <Flex direction='row'>
              <StyledTag size='sm'>{budget}</StyledTag>
              <StyledTag size='sm'>{project_type}</StyledTag>
              <Tooltip
                label={
                  submission_hash ? 'click to view tx' : 'tx hash not found'
                }
                fontSize='xs'
                placement='top'
              >
                <StyledTag
                  bg={submission_type === 'Paid' ? 'red' : 'blackDark'}
                  cursor={submission_type === 'Paid' && 'pointer'}
                  size='sm'
                  onClick={() =>
                    submission_hash &&
                    window.open(`https://etherscan.io/tx/${submission_hash}`)
                  }
                >
                  {submission_type}
                </StyledTag>
              </Tooltip>
              <StyledTag size='sm'>{delivery_priorities}</StyledTag>
            </Flex>
          </Flex>

          <StyledDescriptionText size='sm'>
            {project_desc}
          </StyledDescriptionText>

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
              {services_req.map((service, index) => {
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
        <StyledCardTitle>Client Info</StyledCardTitle>
        <VStack alignItems='flex-start' p='2rem'>
          <Flex
            direction='column'
            justifyContent='space-between'
            alignItems='flex-start'
            mb='.5rem'
          >
            <Text color='white' fontWeight='bold' fontSize='xl' mb='5px'>
              {contact_name}
            </Text>

            <Flex direction='row'>
              {contact_email && (
                <StyledTag size='sm'>{contact_email}</StyledTag>
              )}
              {contact_telegram && (
                <StyledTag size='sm'>{contact_telegram}</StyledTag>
              )}
              {contact_discord && (
                <StyledTag size='sm'>{contact_discord}</StyledTag>
              )}
            </Flex>
          </Flex>

          <StyledDescriptionText size='sm'>{contact_bio}</StyledDescriptionText>

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
              {additional_info}
            </Text>
          </Flex>
        </VStack>
      </GridItem>

      <GridItem colSpan={4} rowSpan={1}>
        <StyledCardTitle>Mutations</StyledCardTitle>
        <SimpleGrid columns={3}>
          {raid && consultationStatus === 'pending' && (
            <VStack mt='1rem'>
              <Button
                w='100%'
                _hover={{
                  opacity: '0.8'
                }}
              >
                <i className='fa-solid fa-circle-check'></i>
                <Text ml='5px'>Complete</Text>
              </Button>
              <Text fontSize='xs' fontFamily='jetbrains'>
                Already promoted to a raid. Please mark the consultation as
                complete.
              </Text>
            </VStack>
          )}

          {!raid && bidStatus !== 'queued' && consultationStatus === 'pending' && (
            <VStack mt='1rem'>
              <Button
                bg='black'
                w='100%'
                _hover={{
                  opacity: '0.8'
                }}
              >
                Promote
              </Button>
              <Button
                w='100%'
                _hover={{
                  opacity: '0.8'
                }}
              >
                Cancel
              </Button>
            </VStack>
          )}
        </SimpleGrid>
      </GridItem>

      <GridItem colStart={5} rowStart={1} spacing='10px'>
        <StyledStatusText>consultation {consultationStatus}</StyledStatusText>
        <StyledCardTitle textAlign='center'>Cleric</StyledCardTitle>
        <VStack mb='1rem' p='.5rem'>
          <Image
            src={boxProfile && boxProfile.imageUrl}
            w='75px'
            borderRadius='50%'
            alt='profile image'
            fallbackSrc='/assets/logos/cleric.png'
            mt='10px'
          />
          <Link href={`/members/${raid.cleric && raid.cleric._id}`} passHref>
            <StyledLinkText>
              {raid && raid.cleric ? raid.cleric.name : 'NaN'}
            </StyledLinkText>
          </Link>
        </VStack>

        {raid && (
          <Link href={`/raids/${raid._id}`} passHref>
            <StyledLinkText>View Raid</StyledLinkText>
          </Link>
        )}
      </GridItem>
    </StyledGrid>
  );
};
