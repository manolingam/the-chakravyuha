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

import { getConsultation } from '../utils/requests';

export const Raid = ({ raid }) => {
  const router = useRouter();
  const formattedRaid = raid[0];

  const [consultation, setConsultation] = useState(null);

  const fetchConsultation = async () => {
    const { consultation } = await getConsultation(formattedRaid.consultation);
    setConsultation(consultation[0]);
  };

  useEffect(() => {
    fetchConsultation();
  }, []);

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
      {!consultation && <Spinner color='red' />}
      {consultation && (
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
                  {consultation.budget}
                </Text>
                <Link
                  href={`/consultations/${formattedRaid.consultation}`}
                  passHref
                >
                  <Text
                    color='red'
                    fontFamily='rubik'
                    textDecoration='underline'
                    cursor='pointer'
                  >
                    {formattedRaid.raid_name}{' '}
                    <i className='fa-solid fa-link'></i>
                  </Text>
                </Link>
              </Flex>
              <Flex direction='column'>
                <Tag mb='5px' bg='purpleLight' w='100%'>
                  {consultation.project_type}
                </Tag>
                <Tag w='100%' bg='purpleLight'>
                  {formattedRaid.category}
                </Tag>
              </Flex>
            </Flex>

            <Flex direction='column' color='white'>
              <Text>{consultation.project_desc}</Text>
            </Flex>

            <Flex direction='column'>
              <Text my='1rem' fontFamily='spaceMono' color='purpleLight'>
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
              onClick={() => router.push(`/member/${formattedRaid.cleric}`)}
            >
              Cleric Info
            </Button>

            <Divider my='1rem' />
            {formattedRaid.status !== 'Lost' &&
              formattedRaid.status !== 'Shipped' && (
                <Flex w='100%' direction='column' alignItems='center'>
                  <Text my='1rem' fontFamily='spaceMono' color='purpleLight'>
                    Required Roles
                  </Text>
                  {formattedRaid.roles_required.length > 0 ? (
                    <UnorderedList>
                      {formattedRaid.roles_required.map((service, index) => {
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
            {formattedRaid.status === 'Shipped' && (
              <Button bg='red' w='100%' mb='1rem' isDisabled>
                <i className='fa-solid fa-ban'></i>
                <Text ml='5px'>Shipped</Text>
              </Button>
            )}
            {formattedRaid.status === 'Lost' && (
              <Button bg='red' w='100%' mb='1rem' isDisabled>
                <i className='fa-solid fa-ban'></i>
                <Text ml='5px'>Lost</Text>
              </Button>
            )}
            {formattedRaid.status === 'Raiding' && (
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
