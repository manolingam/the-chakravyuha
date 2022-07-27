/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
  Grid,
  GridItem,
  VStack,
  Text,
  Tag,
  UnorderedList,
  ListItem,
  Button,
  Textarea,
  Image,
  FormControl,
  FormLabel,
  Checkbox,
  CheckboxGroup,
  Stack
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { InvoiceCard } from '../../shared/escrow/InvoiceCard';
import { getProfile } from '../../utils/3Box';
import { theme } from '../../styles/theme';
import { GUILD_CLASS } from '../../utils/constants';

const StyledGrid = styled(Grid)`
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(1, 1fr);
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

const StyledFormLabel = styled(FormLabel)`
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

export const Raid = ({ raid }) => {
  const [clericBoxProfileImage, setClericBoxProfileImage] = useState(null);
  const [requiredRoles, setRequiredRoles] = useState(raid.roles_required);

  const {
    _id,
    raid_name,
    status,
    category,
    cleric,
    raid_party,
    invoice_address,
    consultation
  } = raid;

  const getBoxProfile = async (eth_address) => {
    const profile = await getProfile(eth_address);
    return profile.imageUrl;
  };

  useEffect(() => {
    if (cleric && cleric.eth_address) {
      getBoxProfile(cleric.eth_address)
        .then((image) => {
          setClericBoxProfileImage(image);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <StyledGrid>
      <GridItem colSpan={5} rowSpan={1} bg='blackLight'>
        <StyledCardTitle>Raid Info</StyledCardTitle>
        <VStack alignItems='flex-start' p='2rem'>
          <Flex
            direction='column'
            justifyContent='space-between'
            alignItems='flex-start'
            mb='.5rem'
          >
            <Text color='red' fontWeight='bold' mb='5px' fontSize='xl'>
              {raid_name}
            </Text>
            <Flex direction='row'>
              <StyledTag size='sm'>{category}</StyledTag>
            </Flex>
          </Flex>

          <StyledDescriptionText
            value={consultation.project_desc}
            fontSize='sm'
          />

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

      <GridItem colSpan={2}>
        <StyledStatusText>{`raid ${status}`}</StyledStatusText>
        <StyledCardTitle textAlign='center'>Cleric</StyledCardTitle>
        <VStack mb='1rem' p='.5rem'>
          <Image
            src={clericBoxProfileImage && clericBoxProfileImage}
            w='50px'
            borderRadius='50%'
            alt='profile image'
            fallbackSrc='/assets/logos/cleric.png'
            mt='10px'
          />
          {!cleric ? (
            <Text>Not Found</Text>
          ) : (
            <Link href={`/members/${cleric && cleric._id}`} passHref>
              <StyledLinkText>{cleric.name}</StyledLinkText>
            </Link>
          )}
        </VStack>

        <StyledCardTitle textAlign='center'>Raid Party</StyledCardTitle>
        {!raid_party && (
          <Text textAlign='center' p='1rem'>
            Not Found
          </Text>
        )}
        {raid_party &&
          raid_party.members.map((member, index) => {
            return (
              <Link href={`/members/${member._id}`} passHref key={index}>
                <StyledLinkText>{member.name}</StyledLinkText>
              </Link>
            );
          })}
        {status !== 'Shipped' && (
          <VStack mt='1rem'>
            <Button
              w='100%'
              _hover={{
                opacity: '0.8'
              }}
            >
              Add
            </Button>
            <Button
              w='100%'
              _hover={{
                opacity: '0.8'
              }}
            >
              Remove
            </Button>
          </VStack>
        )}
      </GridItem>

      <GridItem colSpan={3}>
        <FormControl fontFamily='spaceMono'>
          <StyledFormLabel mb={5}>Required Roles</StyledFormLabel>
          <CheckboxGroup
            color='red'
            onChange={(e) => setRequiredRoles(e)}
            value={requiredRoles}
          >
            <Stack direction='column' maxH='350px' overflowY='scroll'>
              {GUILD_CLASS.map((value, index) => {
                return (
                  <Checkbox
                    key={index}
                    value={value}
                    color='red'
                    fontFamily='jetbrains'
                    size='sm'
                  >
                    {value}
                  </Checkbox>
                );
              })}
            </Stack>
          </CheckboxGroup>
        </FormControl>
        <Button
          w='100%'
          _hover={{
            opacity: '0.8'
          }}
          mt='1rem'
          disabled={status === 'Shipped' || status === 'Cancelled'}
        >
          Update
        </Button>
      </GridItem>

      {invoice_address && (
        <GridItem colSpan={5}>
          <InvoiceCard invoice_address={invoice_address} />
        </GridItem>
      )}
    </StyledGrid>
  );
};
