import { Flex, Box, Text, Spinner } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { ObjectId } from 'mongodb';

import { AppContext } from '../../context/AppContext';
import { connectToDatabase } from '../../utils/mongo';
import { validateMembership } from '../../utils/web3';
import { Consultation } from '../../views/Consultations/Consultation';
import { Page404 } from '../../shared/404';

export async function getServerSideProps(context) {
  try {
    const { db } = await connectToDatabase();
    const consultation = await db
      .collection('consultations')
      .find({ _id: ObjectId(context.params.id) })
      .toArray();
    return {
      props: {
        consultation: JSON.stringify(consultation)
      }
    };
  } catch (e) {
    return {
      props: {
        consultation: []
      }
    };
  }
}

const ConsultationPage = ({ consultation }) => {
  const context = useContext(AppContext);
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
    <>
      {consultation.length > 0 ? (
        <Flex w='80%'>
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

          {context.isMember ? (
            <Consultation consultation={JSON.parse(consultation)} />
          ) : accountValidated ? (
            <Flex direction='column' alignItems='center' m='auto' color='white'>
              <Box fontSize='40px'>
                <i className='fa-solid fa-lock'></i>
              </Box>
              <Text textAlign='center' maxW='500px' fontFamily='spaceMono'>
                You are not a member
              </Text>
            </Flex>
          ) : (
            context.signerAddress && (
              <Flex
                direction='column'
                alignItems='center'
                m='auto'
                color='white'
              >
                <Box fontSize='40px'>
                  <Spinner color='red' />
                </Box>
                <Text textAlign='center' maxW='500px' fontFamily='spaceMono'>
                  Validating your account type..
                </Text>
              </Flex>
            )
          )}
        </Flex>
      ) : (
        <Page404 />
      )}
    </>
  );
};

export default ConsultationPage;
