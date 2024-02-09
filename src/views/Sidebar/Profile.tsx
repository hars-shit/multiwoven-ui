import { getUserProfile, logout } from "@/services/user";
import {
  Avatar,
  Box,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FiEdit3, FiLogOut, FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { data } = useQuery({
    queryKey: ["users", "profile", "me"],
    queryFn: () => getUserProfile(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const logoutResponse = await logout();
    if(logoutResponse.data) {
      toast({
        title: "Signed out successfully",
        isClosable: true,
        duration: 5000,
        status: "success",
        position: "bottom-right",
      });
      navigate('/sign-in');
    }
  }

  const OptionsPopover = () => {
    return (
      <Popover closeOnEsc>
        <PopoverTrigger>
          <FiMoreVertical />
        </PopoverTrigger>
        <PopoverContent
          bgColor="gray.300"
          outline="none"
          border="thin"
          borderColor="gray.600"
          w="182px"
        >
          <PopoverArrow />
          <PopoverBody margin={0} p={0} border="thin" borderColor="gray.600">
            <Box
              _hover={{ bgColor: "gray.400" }}
              bgColor="gray.300"
              w="100%"
              py={3}
              px={2}
              display="flex"
              flexDir="row"
              alignItems="center"
              rounded="lg"
            >
              <FiEdit3 />
              <Text size="sm" fontWeight="semibold" ml={3}>
                Edit Profile
              </Text>
            </Box>
            <Box
              _hover={{ bgColor: "gray.400" }}
              bgColor="gray.300"
              w="100%"
              py={3}
              px={2}
              display="flex"
              flexDir="row"
              alignItems="center"
              color={"red.600"}
              rounded="lg"
              onClick={handleLogout}
            >
              <FiLogOut />
              <Text size="sm" fontWeight="semibold" ml={3}>
                Sign Out
              </Text>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <>
      <Box bgColor="gray.300" px={2} py={2} rounded="xl" w="208px">
        <HStack w="192px" maxW="192px" spacing={0}>
          <Avatar name={data?.data?.attributes.name} mr={1} bgColor='brand.400' marginRight={2} color='gray.100' size='sm' fontWeight='extrabold' />
          <VStack spacing={0} align="start">
            <Box w="128px" maxW="128px">
              <Text size="sm" fontWeight="500" noOfLines={1}>
                {data?.data?.attributes.name}
              </Text>
              <Text color="black.200" size="xs" noOfLines={1}>
                {data?.data?.attributes.email}
              </Text>
            </Box>
          </VStack>
          <Box margin={0} _hover={{ bgColor: "gray.400" }} p={1} rounded="lg">
            <OptionsPopover />
          </Box>
        </HStack>
      </Box>
    </>
  );
};

export default Profile;