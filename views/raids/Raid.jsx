/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
  Text,
  Tag,
  Divider,
  UnorderedList,
  ListItem,
  Button,
  Spinner
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  getConsultationById,
  getRaidPartyByRaid,
  getMultipleMembersByIds
} from '../../utils/requests';

export const Raid = ({ raid }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [raidInfo, setRaidInfo] = useState({});
  const [clericInfo, setClericInfo] = useState({});
  const [consultationInfo, setConsultationInfo] = useState({});
  const [raidPartyInfo, setRaidPartyInfo] = useState([]);

  const fetchCleric = async () => {
    const { members } = await getMultipleMembersByIds([raid[0].cleric]);
    setClericInfo({
      id: members[0]._id,
      name: members[0].name
    });
  };

  const fetchConsultation = async () => {
    const { consultation } = await getConsultationById(raidInfo.consultation);
    setConsultationInfo(consultation[0]);
  };

  const fetchRaidParty = async () => {
    const { raidparty } = await getRaidPartyByRaid(raidInfo._id);
    if (raidparty.length > 0) {
      const { members } = await getMultipleMembersByIds(raidparty[0].members);
      setRaidPartyInfo(members);
    }
  };

  useEffect(() => {
    setRaidInfo(raid[0]);
  }, []);

  useEffect(() => {
    fetchCleric();
    fetchConsultation();
    fetchRaidParty();
    setLoading(false);
  }, [raidInfo]);

  return (
    <Flex
      direction='row'
      w='100%'
      minH='250px'
      alignItems='center'
      justifyContent='center'
      fontFamily='spaceMono'
      border='2px solid'
      borderColor='blackLight'
      p='2rem'
      my='2rem'
    >
      {loading && <Spinner color='red' />}
      {!loading && (
        <>
          <Flex direction='column' w='75%'>
            <Flex
              direction='row'
              w='100%'
              justifyContent='space-between'
              alignItems='center'
              mb='1rem'
            >
              <Flex
                direction='column'
                alignItems='baseline'
                justifyContent='center'
              >
                <Text
                  fontFamily='jetbrains'
                  color='green'
                  fontWeight='bold'
                  fontSize='sm'
                >
                  <i className='fa-solid fa-dollar-sign'></i>{' '}
                  {consultationInfo.budget}
                </Text>
                <Link href={`/consultations/${consultationInfo._id}`} passHref>
                  <Text
                    color='red'
                    fontFamily='rubik'
                    textDecoration='underline'
                    cursor='pointer'
                  >
                    {raidInfo.raid_name} <i className='fa-solid fa-link'></i>
                  </Text>
                </Link>
              </Flex>
              <Flex direction='column'>
                <Tag mb='5px' bg='purpleLight' w='100%'>
                  {consultationInfo.project_type}
                </Tag>
                <Tag w='100%' bg='purpleLight'>
                  {consultationInfo.category}
                </Tag>
              </Flex>
            </Flex>

            <Flex direction='column' color='white'>
              <Text>{consultationInfo.project_desc}</Text>
            </Flex>

            <Flex direction='column'>
              <Text my='1rem' fontFamily='spaceMono' color='purpleLight'>
                Required Services
              </Text>
              <UnorderedList>
                {consultationInfo.services_req.map((service, index) => {
                  return (
                    <ListItem key={index} color='white' fontSize='sm'>
                      {service}
                    </ListItem>
                  );
                })}
              </UnorderedList>
            </Flex>
          </Flex>

          <Flex
            h='100%'
            w='25%'
            direction='column'
            alignItems='flex-start'
            spacing='10px'
            ml='2rem'
          >
            <Button
              bg='red'
              w='100%'
              onClick={() => router.push(`/member/${clericInfo._id}`)}
            >
              Cleric Info
            </Button>

            <Divider my='1rem' />
            {raidInfo.status !== 'Lost' && raidInfo.status !== 'Shipped' && (
              <Flex w='100%' direction='column' alignItems='center'>
                <Text my='1rem' fontFamily='spaceMono' color='purpleLight'>
                  Required Roles
                </Text>
                {raidInfo.roles_required.length > 0 ? (
                  <UnorderedList>
                    {raidInfo.roles_required.map((service, index) => {
                      return (
                        <ListItem key={index} color='white' fontSize='sm'>
                          {service}
                        </ListItem>
                      );
                    })}
                  </UnorderedList>
                ) : (
                  <Button bg='red' w='100%' mb='1rem' isDisabled>
                    <i className='fa-solid fa-ban'></i>
                    <Text ml='5px'>Add Roles</Text>
                  </Button>
                )}
              </Flex>
            )}
            {raidInfo.status === 'Shipped' && (
              <Button bg='red' w='100%' mb='1rem' isDisabled>
                <i className='fa-solid fa-ban'></i>
                <Text ml='5px'>Shipped</Text>
              </Button>
            )}
            {raidInfo.status === 'Lost' && (
              <Button bg='red' w='100%' mb='1rem' isDisabled>
                <i className='fa-solid fa-ban'></i>
                <Text ml='5px'>Lost</Text>
              </Button>
            )}
            {raidInfo.status === 'Raiding' && (
              <Button bg='red' w='100%' mb='1rem' isDisabled>
                <i className='fa-solid fa-ban'></i>
                <Text ml='5px'>Raiding</Text>
              </Button>
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
};
