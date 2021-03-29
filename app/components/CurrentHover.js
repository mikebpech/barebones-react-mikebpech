import React from 'react';
import { Badge, Box } from '@chakra-ui/layout';
import { colors } from '../utils/colors';
import styled from '@emotion/styled';
import _ from 'lodash';
import { Button } from '@chakra-ui/button';
import { Divider } from '@chakra-ui/layout';
import web3 from 'web3';

const CurrentHover = ({ hoverItem, selected }) => {
  const generateBlock = () => {
    if (!hoverItem) {
      const arr = _.times(25, _.constant(null));
      return arr.map((x, i) => <GridItem index={i} color={colors[0]}>{i+1}</GridItem>)
    }
    return (
      hoverItem.artwork?.map((x, i) => <GridItem index={i} color={colors[x]}>{i+1}</GridItem>)
    )
  }

  const generateBadge = (s) => {
    if (s.saleInfo) {
      return (
        <Badge fontSize="md" borderRadius="full" px="2" colorScheme="red">
          For Sale
        </Badge>
      )
    }

    return (
      <Badge fontSize="md" borderRadius="full" px="2" colorScheme="teal">
        New
      </Badge>
    )
  }

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <GridStyling>
        {generateBlock()}
      </GridStyling>
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          { hoverItem && generateBadge(hoverItem)}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            x: {hoverItem?.coordX} &bull; y: {hoverItem?.coordY}
          </Box>
        </Box>

        <Box
          mt="3"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
        >
          <a target="_blank" href={`https://rinkeby.etherscan.io/address/${hoverItem?.ownerId}`}>{hoverItem?.ownerId || 'No owner'}</a>
        </Box>

        <Box mt="2">
          <Box fontWeight="bold">
            { hoverItem?.saleInfo ? `${web3.utils.fromWei(hoverItem.saleInfo?.price, 'ether')} ETH` : '$0.00' }
            <Box px="1" as="span" color="gray.600" fontSize="sm">
              &bull; current price
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider></Divider>
      <Box p="6">
        <Button disabled={!hoverItem?.saleInfo} colorScheme="blue" size="md">Purchase</Button>
      </Box>
    </Box>
  )
}

const GridStyling = styled.div`
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(5, 20px);
  grid-template-rows: repeat(5, 20px);
  justify-content: center;
  padding: 20px 0;
  grid-gap: 1px;
  background-color: #e2e2e2;
`

const GridItem = styled.div`
  background: ${props => props.color};
  border: 1px solid #ddd;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8px;
  color: #dadada;
`

export default CurrentHover;