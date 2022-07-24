import {
  Flex,
  Text,
  Tag,
  Divider,
  UnorderedList,
  ListItem,
  Button
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { getQueuedBids } from '../utils/requests';

export const Consultation = ({ consultation }) => {
  const [bidStatus, setBidStatus] = useState(null);

  const formattedConsultation = consultation[0];

  const consultationStatus =
    formattedConsultation.consultation_hash === 'cancelled'
      ? 'cancelled'
      : formattedConsultation.consultation_hash
      ? 'completed'
      : 'pending';

  const checkForBids = async () => {
    const { bids } = await getQueuedBids(formattedConsultation.submission_hash);
    if (bids.length > 0) {
      setBidStatus(bids[0].status);
    }
  };

  useEffect(() => {
    if (
      consultationStatus === 'pending' &&
      formattedConsultation.submission_hash
    ) {
      checkForBids();
    }
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
              {formattedConsultation.budget}
            </Text>
            <Text color='red' fontFamily='rubik'>
              {formattedConsultation.project_name}
            </Text>
          </Flex>
          <Flex direction='row'>
            <Tag mr='5px' bg='purpleLight'>
              {formattedConsultation.project_type}
            </Tag>
            <Tag bg='purpleLight'>{formattedConsultation.submission_type}</Tag>
          </Flex>
        </Flex>

        <Flex direction='column' color='white'>
          <Text>{formattedConsultation.project_desc}</Text>
        </Flex>

        <Divider my='2rem' />

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
            {formattedConsultation.contact_email && (
              <Text
                fontFamily='jetbrains'
                color='greyLight'
                fontWeight='bold'
                fontSize='sm'
              >
                <i className='fa-solid fa-envelope'></i>{' '}
                {formattedConsultation.contact_email}
              </Text>
            )}
            <Text color='red' fontFamily='rubik'>
              {formattedConsultation.contact_name}
            </Text>
          </Flex>
          <Flex direction='row'>
            {formattedConsultation.contact_telegram && (
              <Tag mr='5px' bg='purpleLight'>
                <i className='fa-brands fa-telegram'></i>{' '}
              </Tag>
            )}
            {formattedConsultation.contact_discord && (
              <Tag bg='purpleLight'>
                <i className='fa-brands fa-discord'></i>
              </Tag>
            )}
          </Flex>
        </Flex>

        <Flex direction='column' color='white'>
          <Text>{formattedConsultation.contact_bio}</Text>
        </Flex>

        <Divider my='2rem' />

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
              color='greyLight'
              fontWeight='bold'
              fontSize='sm'
            >
              {formattedConsultation.delivery_priorities}
            </Text>
            <Text color='red' fontFamily='rubik'>
              More info
            </Text>
          </Flex>
        </Flex>

        <Flex direction='column' color='white'>
          <Text>{formattedConsultation.additional_info}</Text>
        </Flex>

        <Flex direction='column'>
          <Text my='1rem' fontFamily='spaceMono' color='purpleLight'>
            Required Services
          </Text>
          <UnorderedList>
            {formattedConsultation.services_req.map((service, index) => {
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
        {consultationStatus === 'cancelled' && (
          <Button bg='red' w='100%' mb='1rem' isDisabled>
            <i className='fa-solid fa-ban'></i>
            <Text ml='5px'>Cancelled</Text>
          </Button>
        )}
        {consultationStatus === 'completed' && (
          <Button bg='red' w='100%' mb='1rem' isDisabled>
            <i className='fa-solid fa-ban'></i>
            <Text ml='5px'>Accepted</Text>
          </Button>
        )}
        {consultationStatus === 'pending' && (
          <>
            {bidStatus === 'queued' ? (
              <Button bg='red' w='100%' mb='1rem'>
                <i className='fa-solid fa-campground'></i>{' '}
                <Text ml='5px'>Bid Active</Text>
              </Button>
            ) : (
              <Button bg='red' w='100%' mb='1rem'>
                <i className='fa-solid fa-campground'></i>{' '}
                <Text ml='5px'>Promote</Text>
              </Button>
            )}

            <Button bg='red' w='100%'>
              <i className='fa-solid fa-fire'></i>
              <Text ml='5px'>Cancel</Text>
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};
