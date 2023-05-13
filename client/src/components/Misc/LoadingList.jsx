import { SkeletonCircle, SkeletonText, VStack } from "@chakra-ui/react";
import React from "react";

const LoadingList = () => {
  return (
    <>
      <VStack>
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="2" />
      </VStack>
    </>
  );
};

export default LoadingList;
